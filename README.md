This is a concise and effective guide to deploying a Vite/React app to GitHub Pages. Here's a slightly expanded version with some additional context for each step:

### Step-by-Step Guide to Deploying a Vite/React App to GitHub Pages

1. **Install the `gh-pages` package**:
   - Open your terminal in VS Code (use `Ctrl + ~`).
   - Run the following command to install `gh-pages` as a development dependency:
     ```bash
     npm install gh-pages --save-dev
     ```

2. **Update `package.json`**:
   - In your `package.json` file, add the following lines to the `"scripts"` section:
     ```json
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist",
     ```
   - Ensure these lines are added before `"build": "vite build"`. The `predeploy` script will automatically run `npm run build` before deploying, and the `deploy` script will push the `dist` folder to the `gh-pages` branch.

3. **Modify `vite.config.js`**:
   - Open the `vite.config.js` file and add the following line before the `plugins: [react()]` section:
     ```javascript
     base: "/YOUR_REPOSITORY_NAME/",
     ```
   - Replace `YOUR_REPOSITORY_NAME` with the actual name of your GitHub repository. This ensures that all asset paths are correctly prefixed, allowing your app to work from the GitHub Pages URL.

4. **Deploy your app**:
   - In your terminal, run the following command to deploy your app to GitHub Pages:
     ```bash
     npm run deploy
     ```
   - This will create a `gh-pages` branch in your repository, and your app will be live. You can check the deployment status in your GitHub repository under `Settings -> Pages`.

### Updating Your Deployment

Whenever you make changes to your app and want to update the deployment, simply run the `npm run deploy` command again.

This process should get your Vite/React app up and running on GitHub Pages with minimal hassle!


### **Important Note:**
My vite.config.js looked like:

```javascript
export default {
    root: './',
    publicDir: 'public/',
    base: "/Solar-System-Sim/",
}
```

In this project, Vite may not automatically replace the paths to textures of the planets and the HDRI during deployment. To fix this, manually update the paths in your code.

For each texture path, add your GitHub repository name (`/Solar-System-Sim/`) in front. For example:

```javascript
"/textures/texture-name.png"
```

should be updated to:

```javascript
"/Solar-System-Sim/textures/texture-name.png"
```

Make Sure to Put the github page deployment branch to gh-branch not main from github settings.
