import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollAreaBase, ScrollBarBase } from '../components/ui/ScrollareaBase';

const meta: Meta<typeof ScrollAreaBase> = {
  title: 'layout/Scrollarea',
  component: ScrollAreaBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Scrollarea para áreas roláveis, listas horizontais e navegação visual.'
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f6f6f6' },
        { name: 'dark', value: '#222' }
      ]
    },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ScrollAreaBase>;

export const Default: Story = {
  render: () => {
    const works = [
      {
        artist: "Ornella Binni",
        art: "https://s2-techtudo.glbimg.com/L9wb1xt7tjjL-Ocvos-Ju0tVmfc=/0x0:1200x800/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/q/l/TIdfl2SA6J16XZAy56Mw/canvaai.png",
      },
      {
        artist: "Tom Byrom",
        art: "https://s2-techtudo.glbimg.com/L9wb1xt7tjjL-Ocvos-Ju0tVmfc=/0x0:1200x800/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/q/l/TIdfl2SA6J16XZAy56Mw/canvaai.png",
      },
      {
        artist: "Vladimir Malyavko",
        art: "https://s2-techtudo.glbimg.com/L9wb1xt7tjjL-Ocvos-Ju0tVmfc=/0x0:1200x800/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/q/l/TIdfl2SA6J16XZAy56Mw/canvaai.png",
      },
    ];
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
        <div className="mt-5 ml-5 h-auto flex gap-5 p-3 rounded-sm">
        <ScrollAreaBase className="w-96 h-72 whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {works.map((artwork) => (
              <figure key={artwork.artist} className="shrink-0">
                <div className="overflow-hidden rounded-md">
                  <img
                    src={artwork.art}
                    alt={`Photo by ${artwork.artist}`}
                    className="aspect-[4/4] h-auto w-[200px] object-cover"
                    width={200}
                    height={266}
                  />
                </div>
                <figcaption className="pt-2 text-xs text-muted-foreground">
                  Photo by {" "}
                  <span className="font-semibold text-foreground">
                    {artwork.artist}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <ScrollBarBase orientation="horizontal" />
        </ScrollAreaBase>
        </div>
      </div>
    );
  },
};
