/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roleGrunt');
 * mod.thing == 'a thing'; // true
 */

module.exports.gruny = function gruny(creep, Etargets, target, Starget) {
    
    if(Etargets.length > 0 ) {
        if(creep.carry.energy == creep.carryCapacity || creep.transfer(Etargets[0], RESOURCE_ENERGY) != ERR_NOT_IN_RANGE && creep.carry.energy > 0) {
            if(creep.transfer(Etargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Etargets[0]);
            }
        } else {
            let source = creep.pos.findClosestByPath(FIND_SOURCES, {filter: (node) => { return (node.energy > 0 || node.ticksToRegeneration < 20) }});
            if (source) {
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
    else if (creep.carry.energy == creep.carryCapacity && creep.room.controller.ticksToDowngrade > 1000 && target != null || target != null && creep.build(creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)) != ERR_NOT_IN_RANGE && creep.carry.energy > 0 && Game.spawns[Memory.spawns[0].name].energy == Game.spawns[Memory.spawns[0].name].energyCapacity) {
        if(target != null) {
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    } else {
        var targets = creep.room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax});
            targets.sort((a,b) => a.hits - b.hits);
        if(Etargets.length > 0) {
            if(creep.carry.energy == creep.carryCapacity || creep.transfer(Etargets[0], RESOURCE_ENERGY) != ERR_NOT_IN_RANGE && creep.carry.energy > 0) {
                if(creep.transfer(Etargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Etargets[0]);
                }
            } else {
                let source = creep.pos.findClosestByPath(FIND_SOURCES, {filter: (node) => { return (node.energy > 0 || node.ticksToRegeneration < 20) }});
                if (source) {
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
            }
        } else {
            if(creep.carry.energy == creep.carryCapacity || creep.upgradeController(creep.room.controller) != ERR_NOT_IN_RANGE && creep.carry.energy > 0) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            } else {
                let source = creep.pos.findClosestByPath(FIND_SOURCES, {filter: (node) => { return (node.energy > 0 || node.ticksToRegeneration < 20) }});
                if (source) {
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
            }
        }
    }
};