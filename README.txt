DAY OF THE SMUDGIES - STEAM BUILD
=================================

1. ONE-TIME SETUP (Windows)
   - Install Node.js LTS from nodejs.org (the installer defaults are fine).
   - Unzip BOTH parts of this download into the same place. You should have
     smudgies-steam\game\vo1.js through vo9.js. If any are missing the game runs silent.

2. TEST IT
   Open a terminal in the smudgies-steam folder and run:
       npm install
       npm start
   The game opens fullscreen. F11 or Alt+Enter toggles windowed mode. Esc opens the menu.

3. BUILD THE GAME FOLDER FOR STEAM
       npm run dist
   Output: smudgies-steam\dist\win-unpacked\
   That whole folder is what Steam ships. The game file inside is "Day of the Smudgies.exe".
   Double-click it once to make sure it runs.

4. UPLOAD TO STEAM (after Steamworks gives you an App ID and Depot ID)
   - Download the Steamworks SDK from partner.steamgames.com (Downloads page).
   - Edit steam\app_build.vdf: replace YOUR_APP_ID and YOUR_DEPOT_ID.
   - Run (from the SDK's tools\ContentBuilder\builder folder):
       steamcmd.exe +login YOUR_STEAM_USERNAME +run_app_build "C:\full\path\to\smudgies-steam\steam\app_build.vdf" +quit
   - In Steamworks > Installation > General, add a launch option:
       Executable: Day of the Smudgies.exe     OS: Windows
   - In SteamPipe > Builds, set the new build live on the "default" branch.

Saves live in %APPDATA%\Day of the Smudgies\ (Local Storage). To sync them with
Steam Cloud, turn on Auto-Cloud in Steamworks with root WinAppDataRoaming and
subdirectory "Day of the Smudgies/Local Storage", pattern *.

Font: Pixelify Sans, SIL Open Font License (game\fonts\OFL.txt).
