/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Roles');
 * mod.thing == 'a thing'; // true
 */
 var grunty = require('roleGrunt');
 var minery = require('roleMiner');
 var trucky = require('roleTrucker');

module.exports.creepROLES = function cRole() {
    for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    var Starget = creep.room.storage;
    var Etargets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER)
                    && structure.energy < structure.energyCapacity;}});

    if(creep.memory.role == 'grunt') {       
        grunty.gruny(creep, Etargets, target, Starget);
    }
    
    else if(creep.memory.role == 'miner') {
        if(!creep.memory.sourceId) { //if the miner has no source claimed
            for(var i in Memory.sourcesTotal) {
                if(Memory.sourcesTotal[i].used == false && !creep.memory.sourceId){ //Checks for sources who dont have a miner yet
                    creep.memory.sourceId = Memory.sourcesTotal[i].sourceId;
                    Memory.sourcesTotal[i].used = true;
                    Memory.sourcesTotal[i].minerId = creep.memory.name;
                }
            }
        }
        minery.roleMiner(creep);
    }
    
    else if(creep.memory.role == 'trucker') {
        
    }
}


};
/*
for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    var Starget = creep.room.storage;
    var Etargets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER)
                    && structure.energy < structure.energyCapacity;
            
        }
    });

if(creep.memory.role == 'grunt') {       
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
        }
    }
}
//REPAIR ROLE 

if (creep.carry.energy == creep.carryCapacity && creep.room.controller.ticksToDowngrade > 2000 && targets.length > 0 || creep.repair(targets[0]) != ERR_NOT_IN_RANGE && creep.carry.energy > 0 && targets.length > 0) {
    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);    
    }
}
*/
