# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

```
vite-project
├─ .env.development
├─ .env.production
├─ .eslintrc.js
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ ORIG_HEAD
│  ├─ branches
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  ├─ dev
│  │     │  ├─ dev_eslint
│  │     │  ├─ dev_vite-config
│  │     │  ├─ main
│  │     │  └─ master
│  │     └─ remotes
│  │        └─ origin
│  │           ├─ HEAD
│  │           ├─ dev
│  │           ├─ dev_eslint
│  │           └─ dev_vite-config
│  ├─ objects
│  │  ├─ 00
│  │  │  └─ d121d1809a959a36e5b2d1cdbfb4b9558480e6
│  │  ├─ 01
│  │  │  └─ 433bca2ac76590c48fabfee8d69d7b223f48bb
│  │  ├─ 0f
│  │  │  └─ daa031f6cd800b3c09781078862f1378ff804a
│  │  ├─ 11
│  │  │  └─ 603f878f12266e2f1f1db14989f381cb578594
│  │  ├─ 16
│  │  │  └─ b9f09a0f1c2881e252ec677a92e13984018797
│  │  ├─ 1c
│  │  │  └─ 8a3c9ee770cb0c6b185ad82306bb330abcb3c2
│  │  ├─ 2b
│  │  │  └─ b939c87f4b1d3e57436ee74ec76029507e4075
│  │  ├─ 2d
│  │  │  └─ 61249ac32f9c14feb3308c5a36848302eb2a2d
│  │  ├─ 31
│  │  │  └─ 5212d69a7ba5cc02f13ef35b14a8010fe04319
│  │  ├─ 3c
│  │  │  ├─ 18b07a96a0e330ff263b416b86f29fc9c96c70
│  │  │  ├─ 86b2adf295a0721bc9da67a0111579406f24a5
│  │  │  └─ 9ca33900232916039afdbeb1336c4d72d28bb5
│  │  ├─ 48
│  │  │  └─ 320b6911fab63ae306f0ee82f9d329755279fb
│  │  ├─ 52
│  │  │  └─ 65ae6636d1ac9474890ab721ff550e9e13b641
│  │  ├─ 58
│  │  │  └─ 599870745eba388fc97d64b5824085feb3c321
│  │  ├─ 60
│  │  │  └─ 03b14f23b5180dc377b54c27e8a37fe3319d89
│  │  ├─ 65
│  │  │  └─ 10c6a45035b6573151ff6196e4bdea78deb75d
│  │  ├─ 68
│  │  │  └─ 4d04215d72226542a750bb3faeea33e2a385ab
│  │  ├─ 71
│  │  │  └─ b94d3c5367e370302a1200a7464accb194715c
│  │  ├─ 73
│  │  │  └─ 3b549b827282ac4b0527c81af1bb621bfdec0d
│  │  ├─ 75
│  │  │  └─ 45cabc69ef8ad324da22525d68b963f20a814e
│  │  ├─ 86
│  │  │  └─ 17c8a54fe8688308f49bf6a223efea5d7765c4
│  │  ├─ 87
│  │  │  └─ 7954084c21780e27d4d709e8adae8202a24300
│  │  ├─ 8d
│  │  │  └─ 8c6ff09bea4ace242a4fcca3be270b70a5794e
│  │  ├─ 90
│  │  │  └─ 87f598ae28b2525012efe62ecf34bab52fb505
│  │  ├─ 96
│  │  │  └─ d6e96d092d07c914e0674ebfe6a774efe89c8f
│  │  ├─ b3
│  │  │  └─ 6a865f12d23b4fae1b1d2003652f2a29b36f07
│  │  ├─ c2
│  │  │  └─ d3926d3f1fdf5b3b4493d2b9e03ec11557d3a6
│  │  ├─ c9
│  │  │  └─ 4d73474bb9a2bcdd5b611b3211f79e93bd811d
│  │  ├─ ce
│  │  │  └─ 95934ba0bc339ca7ba615469e106af8b84d956
│  │  ├─ d2
│  │  │  ├─ 2a33b0a28084929407520073a1e96afb22b5d5
│  │  │  └─ 7eb5a311f66a73c7f9db4b685c76222f293e4a
│  │  ├─ da
│  │  │  └─ 0e748201c23c340cb07fc94e68db5291f01c69
│  │  ├─ df
│  │  │  ├─ 36fcfb72584e00488330b560ebcf34a41c64c2
│  │  │  └─ 4e2d7644e293af279ac525bad847bba83c3c52
│  │  ├─ e0
│  │  │  └─ 7e649d423dd75b4f12e66651ac794d9143074c
│  │  ├─ e5
│  │  │  └─ 6d09315b03340d7843f11fb954af0a25302a68
│  │  ├─ e6
│  │  │  └─ 9de29bb2d1d6434b8b29ae775ad8c2e48c5391
│  │  ├─ ec
│  │  │  └─ 2e280f8433ca5bc8db357d59522a1d683339e6
│  │  ├─ ef
│  │  │  └─ 665fb0f1928a3521b269c5fa368c1a3f7bb12a
│  │  ├─ f3
│  │  │  └─ d2503fc2a44b5053b0837ebea6e87a2d339a43
│  │  ├─ f5
│  │  │  └─ 342b7d8f66ddf93afb9d508c81ab5bc97d6807
│  │  ├─ info
│  │  └─ pack
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  ├─ dev
│     │  ├─ dev_eslint
│     │  ├─ dev_vite-config
│     │  ├─ main
│     │  └─ master
│     ├─ remotes
│     │  └─ origin
│     │     ├─ HEAD
│     │     ├─ dev
│     │     ├─ dev_eslint
│     │     └─ dev_vite-config
│     └─ tags
├─ .gitignore
├─ .vscode
│  ├─ extensions.json
│  └─ settings.json
├─ README.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ favicon.ico
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  └─ logo.png
│  ├─ components
│  │  ├─ HelloWorld.vue
│  │  └─ demo.vue
│  ├─ env.d.ts
│  └─ main.ts
├─ tsconfig.json
├─ vite.config.ts
├─ 文件命名规范.md
└─ 目录管理规范.md

```