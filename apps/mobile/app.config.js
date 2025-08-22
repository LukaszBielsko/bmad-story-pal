export default {
  expo: {
    name: "StoryMagic",
    slug: "storymagic-dev",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    splash: {
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.storymagic.dev"
    },
    android: {
      package: "com.storymagic.dev"
    },
    platforms: ["ios", "android"],
    entryPoint: "./App.tsx"
  }
};