import { DeviceModelId, getDeviceModel } from "@ledgerhq/devices";
import { PostOnboardingAction, PostOnboardingActionId } from "@ledgerhq/types-live";
import { Icons } from "@ledgerhq/react-ui";
import { setDrawer } from "~/renderer/drawers/Provider";
import PostOnboardingMockAction from "~/renderer/components/PostOnboardingHub/PostOnboardingMockAction";
import CustomImage from "~/renderer/screens/customImage";

const claimMock: PostOnboardingAction = {
  id: PostOnboardingActionId.claimMock,
  Icon: Icons.Gift,
  title: "Claim my NFT",
  titleCompleted: "Claim my NFT",
  description: "A special NFT for you.",
  tagLabel: "Free",
  actionCompletedPopupLabel: "NFT claimed",
  startAction: () => setDrawer(PostOnboardingMockAction, { id: PostOnboardingActionId.claimMock }),
};

const personalizeMock: PostOnboardingAction = {
  id: PostOnboardingActionId.personalizeMock,
  Icon: Icons.PictureImage,
  title: `Personalize my ${getDeviceModel(DeviceModelId.stax).productName}`,
  titleCompleted: `Personalize my ${getDeviceModel(DeviceModelId.stax).productName}`,
  description: "By customizing the screen.",
  actionCompletedPopupLabel: "Device personalized",
  startAction: () =>
    setDrawer(PostOnboardingMockAction, { id: PostOnboardingActionId.personalizeMock }),
};

const migrateAssetsMock: PostOnboardingAction = {
  id: PostOnboardingActionId.migrateAssetsMock,
  Icon: Icons.ArrowDown,
  title: "Transfer assets to my Ledger",
  titleCompleted: "Transfer assets to my Ledger",
  description: "Easily secure assets from coinbase or another exchange.",
  actionCompletedPopupLabel: "Assets transfered",
  startAction: () =>
    setDrawer(PostOnboardingMockAction, { id: PostOnboardingActionId.migrateAssetsMock }),
};

const customImage: PostOnboardingAction = {
  id: PostOnboardingActionId.customImage,
  Icon: Icons.PictureImage,
  title: "customImage.postOnboarding.title",
  titleCompleted: "customImage.postOnboarding.title",
  description: "customImage.postOnboarding.description",
  actionCompletedPopupLabel: "customImage.postOnboarding.actionCompletedPopupLabel",
  startAction: () =>
    setDrawer(
      CustomImage,
      { isFromPostOnboardingEntryPoint: true },
      { forceDisableFocusTrap: true },
    ),
  buttonLabelForAnalyticsEvent: "Set lock screen picture",
};

const assetsTransfer: PostOnboardingAction = {
  id: PostOnboardingActionId.assetsTransfer,
  featureFlagId: "postOnboardingAssetsTransfer",
  Icon: Icons.ArrowDown,
  title: "postOnboarding.actions.assetsTransfer.title",
  titleCompleted: "postOnboarding.actions.assetsTransfer.titleCompleted",
  description: "postOnboarding.actions.assetsTransfer.description",
  actionCompletedPopupLabel: "postOnboarding.actions.assetsTransfer.popupLabel",
  buttonLabelForAnalyticsEvent: "Secure your assets on Ledger",
  startAction: ({ openModalCallback }) => openModalCallback("MODAL_RECEIVE"),
};

const buyCrypto: PostOnboardingAction = {
  id: PostOnboardingActionId.buyCrypto,
  Icon: Icons.Plus,
  title: "postOnboarding.actions.buyCrypto.title",
  titleCompleted: "postOnboarding.actions.buyCrypto.titleCompleted",
  description: "postOnboarding.actions.buyCrypto.description",
  actionCompletedPopupLabel: "postOnboarding.actions.buyCrypto.popupLabel",
  buttonLabelForAnalyticsEvent: "Buy Crypto",
  startAction: ({ navigationCallback }) => navigationCallback("/exchange"),
};

/**
 * All implemented post onboarding actions.
 */
const postOnboardingActions: { [id in PostOnboardingActionId]?: PostOnboardingAction } = {
  claimMock,
  migrateAssetsMock,
  personalizeMock,
  customImage,
  assetsTransfer,
  buyCrypto,
};

/**
 * Mock of post onboarding actions for DeviceModelId.stax
 */
const staxPostOnboardingActionsMock: PostOnboardingAction[] = [
  claimMock,
  personalizeMock,
  migrateAssetsMock,
];

export function getPostOnboardingAction(
  id: PostOnboardingActionId,
): PostOnboardingAction | undefined {
  return postOnboardingActions[id];
}

/**
 * Returns the list of post onboarding actions for a given device.
 * TODO: keep this updated as we implement feature that we want to add in the
 * post onboarding.
 */
export function getPostOnboardingActionsForDevice(
  deviceModelId: DeviceModelId,
  mock = false,
): PostOnboardingAction[] {
  switch (deviceModelId) {
    case DeviceModelId.nanoS:
      /** Set here the list of actions for the post onboarding of the Nano S */
      return [];
    case DeviceModelId.nanoSP:
      /** Set here the list of actions for the post onboarding of the Nano SP */
      return [];
    case DeviceModelId.nanoX:
      /** Set here the list of actions for the post onboarding of the Nano X */
      return [];
    case DeviceModelId.stax:
      if (mock) return staxPostOnboardingActionsMock;
      /**
       * Set here the list of actions for the post onboarding of the
       * DeviceModelId.stax
       * */
      return [customImage, assetsTransfer, buyCrypto];
    default:
      return [];
  }
}
