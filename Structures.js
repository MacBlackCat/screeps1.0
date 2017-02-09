/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Structures');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

};

// TOWER SCRIPT
var enemies = Game.spawns[Memory.spawns[0].name].room.find(FIND_HOSTILE_CREEPS);
if(enemies.length > 0) {
    var towers = Game.spawns[Memory.spawns[0].name].room.find(FIND_MY_STRUCTURES, { filter: {structureType: STRUCTURE_TOWER}});
    for (var id in towers) {
        towers[id].attack(enemies[0]);
    }
}
//