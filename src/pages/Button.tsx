import { ButtonBase, ButtonGroupBase } from "@/components/ui/ButtonBase";
import {
  AddButton,
  BackButton,
  CheckButton,
  CloseButton,
  CopyButton,
  DeleteButton,
  DownloadButton,
  EditButton,
  FavoriteButton,
  FilterButton,
  LikeButton,
  LockButton,
  MoreButton,
  NotificationButton,
  RefreshButton,
  SaveButton,
  SearchButton,
  SettingsButton,
  UploadButton,
  VisibilityButton,
} from "@/components/ui/SmallButtons";

export const ButtonPage = () => {
  return (
    <>
      <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
        <h2 className="font-bold text-2xl">Buttons</h2>

        <div className="flex flex-wrap gap-4">
          <ButtonBase>Default</ButtonBase>
          <ButtonBase variant="destructive">Destructive</ButtonBase>
          <ButtonBase variant="ghost">Ghost</ButtonBase>
          <ButtonBase variant="link">Link</ButtonBase>
          <ButtonBase variant="outline">Outline</ButtonBase>
          <ButtonBase variant="secondary">Secondary</ButtonBase>
        </div>

        <h2 className="font-bold text-2xl mt-6">Button Groups</h2>
        <div className="flex-wrap">
          <ButtonGroupBase orientation="vertical" className="pr-4">
            <ButtonBase variant="default">Aceitar</ButtonBase>
            <ButtonBase variant="outline">Talvez</ButtonBase>
            <ButtonBase variant="destructive">Recusar</ButtonBase>
          </ButtonGroupBase>
          <ButtonGroupBase orientation="vertical" className="px-4">
            <ButtonBase variant="default">Sim</ButtonBase>
            <ButtonBase variant="secondary">Depois</ButtonBase>
            <ButtonBase variant="destructive">Não</ButtonBase>
          </ButtonGroupBase>
          <ButtonGroupBase className="px-4">
            <ButtonBase variant="default">Join</ButtonBase>
            <ButtonBase variant="ghost">Later</ButtonBase>
            <ButtonBase variant="destructive">Leave</ButtonBase>
          </ButtonGroupBase>
          <ButtonGroupBase className="px-6">
            <ButtonBase variant="default">1</ButtonBase>
            <ButtonBase>2</ButtonBase>
            <ButtonBase>3</ButtonBase>
          </ButtonGroupBase>
        </div>
        <h2 className="font-bold text-2xl mt-6">Fast Button</h2>
        <div className="flex gap-3">
          <EditButton />
          <SaveButton />
          <AddButton />
          <CloseButton />
          <DeleteButton />
          <DownloadButton />
          <UploadButton />
          <CopyButton />
          <RefreshButton />
          <SearchButton />
          <BackButton />
          <SettingsButton />
          <NotificationButton />
          <MoreButton />
          <CheckButton />
          <FilterButton />
          <LikeButton />
          <LockButton />
          <VisibilityButton />
          <FavoriteButton />
        </div>

        <div className="my-8 mx-5">
          <h3 className="text-xl font-semibold mb-3">Documentação</h3>
          <div className="border-t-2 border-gray-300 mb-4"></div>

          <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
            <h5 className="font-medium mb-2">Como importar:</h5>
            <pre className="bg-gray-900 p-3 rounded-sm">
              <code>
                {`import { ButtonBase, ButtonGroupBase } from "@/components/ui/ButtonBase";`}
              </code>
            </pre>
          </div>

          <div className="bg-gray-800 text-white p-4 rounded-md">
            <h5 className="font-medium mb-2">Como usar:</h5>
            <pre className="bg-gray-900 p-3 rounded-sm">
              <code>
                {`<ButtonBase>Default</ButtonBase>
<ButtonBase variant="destructive">Destructive</ButtonBase>
<ButtonBase variant="ghost">Ghost</ButtonBase>
<ButtonBase variant="link">Link</ButtonBase>
<ButtonBase variant="outline">Outline</ButtonBase>
<ButtonBase variant="secondary">Secondary</ButtonBase>
<ButtonBase disabled>Disabled</ButtonBase>
<ButtonBase loading>Loading</ButtonBase>
<ButtonBase iconOnly><span className="material-icons">favorite</span></ButtonBase>`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};
