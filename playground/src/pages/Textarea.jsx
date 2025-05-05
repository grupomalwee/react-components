
import { TextAreaBase } from "@lib";
import { ButtonBase } from "@lib";

export const TextareaPage = () => {
  return (
    <div>
      <div className="mt-5 ml-5 flex gap-5 p-3 rounded-sm">
        <div className="flex flex-col items-start gap-2">
          <p className="pb-3" htmlFor="message">
            Default
          </p>
          <TextAreaBase
            className="h-14 w-44"
            placeholder="Type your message here"
          ></TextAreaBase>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="pb-3" htmlFor="message">
            With label
          </p>
          <TextAreaBase
            className="h-14 w-44"
            placeholder="Type your message here"
          ></TextAreaBase>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="pb-3" htmlFor="message">
            With text
          </p>
          <TextAreaBase
            className="h-14 w-44"
            placeholder="Type your message here"
          ></TextAreaBase>
          <p className="text-sm text-muted-foreground">Text here</p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="pb-3" htmlFor="message">
            With label
          </p>
          <TextAreaBase
            className="h-14 w-44"
            placeholder="Type your message here"
          ></TextAreaBase>
          <ButtonBase className="w-full">Send message</ButtonBase>
        </div>
      </div>

      <div className="mt-5 ml-5 flex gap-5 p-3 rounded-sm">
        <div className="flex flex-col items-start gap-2">
          <p className="pb-3" htmlFor="message">
            Form Type
          </p>
          <TextAreaBase
            className="h-14 w-44"
            placeholder="Type your message here"
          ></TextAreaBase>
          <p className="text-sm text-muted-foreground">Text here</p>
          <ButtonBase className="pt-2 w-44">Send message</ButtonBase>
        </div>
      </div>

      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`import { TextAreaBase } from "@/components/ui/TextAreaBase";
import  LabelBase  from "@/components/ui/LabelBase";
import { ButtonBase } from "@/components/ui/ButtonBase";`}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<div className="flex flex-col items-start gap-2">
  <LabelBase className="pb-3" htmlFor="message">Default</LabelBase>
  <TextAreaBase className="h-14 w-44" placeholder="Type your message here"></TextAreaBase>
</div>`}
            </code>
          </pre>
          <pre className="bg-gray-900 p-3 rounded-sm mt-4">
            <code>
              {`<div className="flex flex-col items-start gap-2">
  <LabelBase className="pb-3" htmlFor="message">With label</LabelBase>
  <TextAreaBase className="h-14 w-44" placeholder="Type your message here"></TextAreaBase>
  <ButtonBase className="w-full">Send message</ButtonBase>
</div>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
