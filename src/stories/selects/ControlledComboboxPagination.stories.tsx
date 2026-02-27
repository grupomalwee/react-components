import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, useEffect, useCallback, useRef } from "react";
import { ThemeProviderBase } from "@/components/theme/theme-provider";
import { ControlledCombobox } from "@/components/ui/selects/ControlledCombobox";

const meta: Meta<typeof ControlledCombobox> = {
  title: "selects/Controlled Combobox",
  component: ControlledCombobox,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProviderBase>
        <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <Story />
        </div>
      </ThemeProviderBase>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ControlledCombobox>;

// API response types
interface ArtworkItem {
  id: number;
  title: string;
}

interface GitHubUser {
  id: number;
  login: string;
}

const PAGE_SIZE = 20;

export const PublicAPI: Story = {
  name: "Public API",
  parameters: {
    docs: {
      source: {
        code: `import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ControlledCombobox } from '@mlw-packages/react-components';

function PublicAPI() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchItems = useCallback(async (isInitial = false, query = "") => {
    if (loading) return;
    setLoading(true);
    try {
      const currentPage = isInitial ? 1 : page + 1;
      const endpoint = query
        ? \`https://api.artic.edu/api/v1/artworks/search?q=\${encodeURIComponent(query)}&page=\${currentPage}&limit=20\`
        : \`https://api.artic.edu/api/v1/artworks?page=\${currentPage}&limit=20\`;
      
      const response = await fetch(endpoint);
      const json = await response.json();
      
      const newItems = json.data.map(item => ({
        label: item.title,
        value: String(item.id),
      }));
      
      if (isInitial) {
        setItems(newItems);
        setPage(1);
      } else {
        setItems(prev => [...prev, ...newItems]);
        setPage(currentPage);
      }
      setTotal(json.pagination.total);
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, page]);

  useEffect(() => {
    fetchItems(true, "");
  }, []);

  return (
    <ControlledCombobox
      items={items}
      loading={loading}
      renderSelected={selected ? items.find(i => i.value === selected)?.label || "Item Selected" : "Search in 120k+ artworks..."}
      handleSelection={(val) => setSelected(val)}
      checkIsSelected={(val) => selected === val}
      onSearchChange={(val) => setSearch(val)}
      onEndReached={() => { if (!loading && items.length < total) fetchItems(false, search); }}
      hasSelected={!!selected}
      onClear={() => setSelected(null)}
      searchPlaceholder="Type to search artworks..."
    />
  );
}
`,
      },
    },
  },
  render: () => {
    const [items, setItems] = useState<{ label: string; value: string }[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [total, setTotal] = useState(0);

    const fetchItems = useCallback(
      async (isInitial = false, query = "") => {
        if (loading) return;
        setLoading(true);

        try {
          const currentPage = isInitial ? 1 : page + 1;
          const endpoint = query
            ? `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&page=${currentPage}&limit=${PAGE_SIZE}`
            : `https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=${PAGE_SIZE}`;

          const response = await fetch(endpoint);
          const json = await response.json();

          const newItems = json.data.map((item: ArtworkItem) => ({
            label: item.title,
            value: String(item.id),
          }));

          if (isInitial) {
            setItems(newItems);
            setPage(1);
          } else {
            setItems((prev) => [...prev, ...newItems]);
            setPage(currentPage);
          }
          setTotal(json.pagination.total);
        } catch (error) {
          console.error("Failed to fetch artworks:", error);
        } finally {
          setLoading(false);
        }
      },
      [loading, page],
    );

    useEffect(() => {
      fetchItems(true, "");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (val: string) => {
      setSearch(val);
      fetchItems(true, val);
    };

    return (
      <div className="w-[400px]">
        <div className="mb-2 text-sm text-muted-foreground">
          Total items available: {total.toLocaleString()}
        </div>
        <ControlledCombobox
          items={items}
          loading={loading}
          onSearchChange={handleSearch}
          search={search}
          onEndReached={() => {
            if (!loading && items.length < total) {
              fetchItems(false, search);
            }
          }}
          searchPlaceholder="Type to search artworks..."
          label="Artworks"
        />
      </div>
    );
  },
};

export const PublicUserAPI: Story = {
  name: "Public User API",
  parameters: {
    docs: {
      source: {
        code: `import React, { useState, useEffect, useCallback } from 'react';
import { ControlledCombobox } from '@mlw-packages/react-components';

function PublicUserAPI() {
  const [items, setItems] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const fetchItems = useCallback(async (isInitial = false, query = "") => {
    if (loading) return;
    setLoading(true);
    try {
      const since = isInitial ? 0 : lastId;
      const response = await fetch(\`https://api.github.com/users?since=\${since}&per_page=20\`);
      
      if (response.status === 403) {
        alert('GitHub API Rate limit reached. Please try again later.');
        return;
      }
      
      const json = await response.json();
      const newItems = json.map(user => ({
        label: \`User \${user.id} (\${user.login})\`,
        value: String(user.id),
      }));
      
      const filteredItems = query ? newItems.filter(item => item.label.toLowerCase().includes(query.toLowerCase())) : newItems;
      
      if (isInitial) {
        setItems(filteredItems);
        setLastId(json[json.length - 1]?.id || 0);
      } else {
        setItems(prev => [...prev, ...filteredItems]);
        setLastId(json[json.length - 1]?.id || lastId);
      }
    } catch (error) {
      console.error('Failed to fetch GitHub users:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, lastId]);

  useEffect(() => {
    fetchItems(true, "");
  }, []);

  return (
    <ControlledCombobox
      items={items}
      loading={loading}
      renderSelected={selected ? items.find(i => i.value === selected)?.label || "User Selected" : "Search massive GitHub dataset..."}
      handleSelection={(val) => setSelected(val)}
      checkIsSelected={(val) => selected === val}
      onSearchChange={(val) => setSearch(val)}
      onEndReached={() => { if (!loading) fetchItems(false, search); }}
      hasSelected={!!selected}
      onClear={() => setSelected(null)}
      searchPlaceholder="Type to filter results..."
    />
  );
}
`,
      },
    },
  },
  render: () => {
    const [items, setItems] = useState<{ label: string; value: string }[]>([]);
    const [lastId, setLastId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [total] = useState(100000000);

    const fetchItems = useCallback(
      async (isInitial = false, query = "") => {
        if (loading) return;
        setLoading(true);

        try {
          const since = isInitial ? 0 : lastId;
          const endpoint = query
            ? `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${isInitial ? 1 : Math.floor(items.length / PAGE_SIZE) + 1}&per_page=${PAGE_SIZE}`
            : `https://api.github.com/users?since=${since}&per_page=${PAGE_SIZE}`;

          const response = await fetch(endpoint);

          if (response.status === 403) {
            alert(
              "GitHub API Rate limit reached. Please try again later or use an Auth token.",
            );
            return;
          }

          const json = await response.json();
          const rawNodes = query ? json.items : json;

          if (!Array.isArray(rawNodes)) {
            throw new Error("Invalid response from GitHub");
          }

          const newItems = rawNodes.map((user: GitHubUser) => ({
            label: `User ${user.id} (${user.login})`,
            value: String(user.id),
          }));

          if (isInitial) {
            setItems(newItems);
            setLastId(rawNodes[rawNodes.length - 1]?.id || 0);
          } else {
            setItems((prev) => [...prev, ...newItems]);
            setLastId(rawNodes[rawNodes.length - 1]?.id || lastId);
          }
        } catch (error) {
          console.error("Failed to fetch GitHub users:", error);
        } finally {
          setLoading(false);
        }
      },
      [loading, lastId],
    );

    useEffect(() => {
      fetchItems(true, "");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (val: string) => {
      setSearch(val);
      fetchItems(true, val);
    };

    return (
      <div className="w-[400px]">
        <div className="mb-2 text-sm text-muted-foreground">
          Showing {items.length} of {total.toLocaleString()} users from GitHub
          (Sequential IDs)
        </div>
        <ControlledCombobox
          items={items}
          loading={loading}
          onSearchChange={handleSearch}
          search={search}
          onEndReached={() => {
            if (!loading && items.length < total) {
              fetchItems(false, search);
            }
          }}
          searchPlaceholder="Type to filter results..."
        />
      </div>
    );
  },
};

export const LargeUserDataset: Story = {
  name: "Large User Dataset",
  parameters: {
    docs: {
      source: {
        code: `import React, { useState, useCallback } from 'react';
import { ControlledCombobox } from '@mlw-packages/react-components';

function LargeUserDataset() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [total, setTotal] = useState(100001);
  const PAGE_SIZE = 20;

  const fetchItems = useCallback(async (isInitial = false, query = "") => {
    if (loading) return;
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const currentPage = isInitial ? 1 : page + 1;
      const start = (currentPage - 1) * PAGE_SIZE;
      let results = [];
      
      if (query) {
        for (let i = 0; i < 100001; i++) {
          const label = \`User \${i}\`;
          if (label.toLowerCase().includes(query.toLowerCase())) {
            results.push({ label, value: \`user-\${i}\` });
          }
        }
        results = results.slice(start, start + PAGE_SIZE);
      } else {
        const end = Math.min(start + PAGE_SIZE, 100001);
        for (let i = start; i < end; i++) {
          results.push({ label: \`User \${i}\`, value: \`user-\${i}\` });
        }
      }
      
      if (isInitial) {
        setItems(results);
        setPage(1);
      } else {
        setItems(prev => [...prev, ...results]);
        setPage(currentPage);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, page]);

  return (
    <ControlledCombobox
      items={items}
      loading={loading}
      renderSelected={selected ? items.find(i => i.value === selected)?.label || "User Selected" : "Search 100k+ users..."}
      handleSelection={(val) => setSelected(val)}
      checkIsSelected={(val) => selected === val}
      onSearchChange={(val) => setSearch(val)}
      onEndReached={() => { if (!loading && items.length < total) fetchItems(false, search); }}
      hasSelected={!!selected}
      onClear={() => setSelected(null)}
      searchPlaceholder="Type 'User 99999'..."
    />
  );
}
`,
      },
    },
  },
  render: () => {
    const [items, setItems] = useState<{ label: string; value: string }[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [total, setTotal] = useState(100001);

    const currentSearchRef = useRef("");

    // Performance-optimized mock fetcher
    const fetchItems = useCallback(
      async (isInitial = false, query = "") => {
        if (loading) return;
        setLoading(true);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        try {
          const currentPage = isInitial ? 1 : page + 1;
          const start = (currentPage - 1) * PAGE_SIZE;

          let filteredTotal = 100001;
          let results: { label: string; value: string }[] = [];

          if (query) {
            const searchMatches: { label: string; value: string }[] = [];
            const lowercaseQuery = query.toLowerCase();

            for (let i = 0; i < 100001; i++) {
              const label = `User ${i}`;
              if (label.toLowerCase().includes(lowercaseQuery)) {
                searchMatches.push({
                  label,
                  value: `user-${i}`,
                });
              }
            }
            filteredTotal = searchMatches.length;
            results = searchMatches.slice(start, start + PAGE_SIZE);
          } else {
            const end = Math.min(start + PAGE_SIZE, 100001);
            for (let i = start; i < end; i++) {
              results.push({
                label: `User ${i}`,
                value: `user-${i}`,
              });
            }
            filteredTotal = 100001;
          }

          if (isInitial) {
            setItems(results);
            setPage(1);
          } else {
            setItems((prev) => [...prev, ...results]);
            setPage(currentPage);
          }
          setTotal(filteredTotal);
        } catch (error) {
          console.error("Failed to fetch large user dataset:", error);
        } finally {
          setLoading(false);
        }
      },
      [loading, page],
    );

    useEffect(() => {
      fetchItems(true, "");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (search === currentSearchRef.current) return;

      const timer = setTimeout(() => {
        currentSearchRef.current = search;
        fetchItems(true, search);
      }, 500);

      return () => clearTimeout(timer);
    }, [search, fetchItems]);

    return (
      <div className="w-[400px]">
        <div className="mb-2 text-sm text-muted-foreground">
          Total items: {total.toLocaleString()} (Mocked 100k+)
        </div>
        <ControlledCombobox
          items={items}
          loading={loading}
          onSearchChange={(val) => setSearch(val)}
          onEndReached={() => {
            if (!loading && items.length < total) {
              fetchItems(false, search);
            }
          }}
          searchPlaceholder="Type 'User 99999'..."
        />
      </div>
    );
  },
};
