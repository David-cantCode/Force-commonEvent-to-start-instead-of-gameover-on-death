/*:

 * @target MZ
 * @plugindesc Handles player death by calling a common event instead of Game Over.
 * @author David
 * @url https://github.com/David-cantCode
 * 
 * 
 * 
 * 
 *
 * @param DeathCommonEventID
 * @text Death Common Event ID
 * @desc The ID of the Common Event to run when the party dies.
 * @type common_event
 * @default 1
 *
 * @help
 * This plugin allows you to run a specific Common Event when the player
 * loses a battle, instead of going to the Game Over screen. 
 * I recommend toggling it within the engine when you need it like i did
 */

var Imported = Imported || {};
var DeathEventHandler = DeathEventHandler || {};

(() => {
    const parameters = PluginManager.parameters('DeathEventHandler');
    const DeathCommonEventID = Number(parameters['EventID'] || 1);

    BattleManager.updateBattleEnd = function() {
        if (this.isBattleTest()) {
            AudioManager.stopBgm();
            SceneManager.exit();
        } else if (!this._escaped && $gameParty.isAllDead()) {
            if (this._canLose) {
                $gameParty.reviveBattleMembers();
                SceneManager.pop();
            } else {
                if (DeathCommonEventID > 0) {
                    $gameTemp.reserveCommonEvent(DeathCommonEventID);
                }
                SceneManager.pop();
            }
        } else {
            SceneManager.pop();
        }
        this._phase = null;
    };

    //ifs everywheres but idc
})();
