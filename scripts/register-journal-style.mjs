import CONFIG from "./module.mjs";

function registerSettings() {
  game.settings.register("hopefinder", "firstTime", {
    name: "Initial Pop-Up",
    scope: "client",
    config: false,
    type: Boolean,
    default: true
})
};

Hooks.once("init", () => {
  registerSettings();
});

Hooks.once('ready', async function () {
    if (game.user.isGM) {
        if (game.settings.get("hopefinder", "firstTime") == true) {
            const journals = await game.packs.get("hopefinder.hopefinder-journals").getDocuments();
            const journal = journals.filter(j => j.id == "7NSV1EbfvS7tOwls")[0]
            journal.sheet.render(true)
            game.settings.set("hopefinder", "firstTime", false)
        }
    }
})

Hooks.on("renderJournalSheet", (app, html, data) => {
  const journal = app.document;
  if ( journal.getFlag(CONFIG.moduleID, CONFIG.journalFlag) ) html[0].classList.add(CONFIG.cssClass);
});

Hooks.on("renderJournalPageSheet", (app, html, data) => {
  const journal = app.document.parent;
  if ( journal.getFlag(CONFIG.moduleID, CONFIG.journalFlag) ) html[0].classList.add(CONFIG.cssClass);
});
