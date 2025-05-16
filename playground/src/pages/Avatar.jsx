import {
  AvatarBase,
  AvatarFallbackBase,
  AvatarImageBase,
} from "@lib";

export const AvatarPage = () => {
  return (
    <>
      <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
        <div className="flex justify-center">
          <AvatarBase>
            <AvatarImageBase src="https://github.com/shadcn.png" />
            <AvatarFallbackBase>CN</AvatarFallbackBase>
          </AvatarBase>
        </div>

        <div className="my-8 mx-5">
          <h3 className="text-xl font-semibold mb-3">Documentação</h3>
          <div className="border-t-2 border-gray-300 mb-4"></div>

          <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
            <h5 className="font-medium mb-2">Como importar:</h5>
            <pre className="bg-gray-900 p-3 rounded-sm">
              <code>
                {`import {
  AvatarBase,
  AvatarFallbackBase,
  AvatarImageBase,
} from "@/components/ui/AvatarBase";`}
              </code>
            </pre>
          </div>

          <div className="bg-gray-800 text-white p-4 rounded-md">
            <h5 className="font-medium mb-2">Como usar:</h5>
            <pre className="bg-gray-900 p-3 rounded-sm">
              <code>
                {`<AvatarBase>
  <AvatarImageBase src="https://github.com/shadcn.png" />
  <AvatarFallbackBase>CN</AvatarFallbackBase>
</AvatarBase>`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};
