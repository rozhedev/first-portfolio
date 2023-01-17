# Portfolio

My first simple portfolio. [Demo](https://rozhedev.github.io/first-portfolio/)

## Usage

I use Gulp-based build. First of all, open project in [VS Code](https://code.visualstudio.com). After that, open terminal.

If you do not have Gulp installed, write the commands:

```bash
  npm i gulp -D

  npm i gulp-cli -D
```

After that, install dependencies:

```bash
  npm i
```

For start the project in development mode:

```bash
  gulp
```

If the project is finished, minify the code and images, use command:

```bash
  gulp --production
```

### Troubleshooting

1. Set VS Code to run as an administrator [Click](https://qastack.ru/programming/37700536/visual-studio-code-terminal-how-to-run-a-command-with-administrator-rights)
2. Open PowerShell with administrator rights and type command: "Set-ExecutionPolicy RemoteSigned" after that displaying confirm dialog, press "Y". This step need for allow execute local scripts in PowerShell.
3. **Node JS v14** and **Gulp v4** is required to work correctly (NodeJS v14.14 and Gulp v4.0.1 is based version).
4. **npm rebuild** - if not all packages are installed after **npm i** command.
5. **npm cache verify** - If after restarting, build doesn't catch changes "on the fly".

### Folder structure

**src** - source folder.

**dist** - project bundle.

For all files in #src folder, write path as like **from z_dist** folder.

```
project
│   readme.md
│   package.json 
|   package-lock.json
|   gulpfile.js
|   .gitignore
|
└───src
│   └───fonts                     # Fonts in .ttf, .otf format
|   │   
|   └───html                      # All .html files
|   |   └───...
|   |
│   └───img                       # All images
|   |   └───...    
|   |
│   └───js                        # All .js files
|   |   └───...    
|   |
│   └───json                      # All .json files
|   |   └───...    
|   |
|   └───scss                      # All .scss files
|       └───base                  # Basic stylisation files (vars, null, fonts etc.)
|       └───components            # Components styles
│   
└───dist                          # Project bundle
|   └───css
|   └───fonts
|   └───img
|   └───js
|   *.html
|
└───node_modules
    └───...
```