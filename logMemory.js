module.exports.checkMemory = function memoryChecks() {
    console.log("Executing memory check...");
    //Execute checks
    frequentChecks();
    occasionalChecks();
    //
    
    //Complete check
    console.log("Memory check completed!");
    Memory.oCheck.timer --;
    Memory.oCheck.ticksAlive ++;
    //
};

function frequentChecks() //These checks need to be done every tick
{
    if(!Memory.minersAlive) {
        Memory.minersAlive = {};
    }
    // DELETE DEAD CREEPS FROM MEMORY
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            if(Memory.creeps[i].role == "miner"){ //checks if creep was a miner in order to reset source memory
                var e = Memory.creeps[i].sourceId;
                if(e){
                    Memory.sourcesTotal[e].used = false;
                    Memory.sourcesTotal[e].minerId = 0;
                }
            }
            delete Memory.creeps[i]; //removes dead creep
        }
    }
    //
    
    // LOG AMOUNT CREEPS ALIVE
    console.log(_.size(Memory.creeps) + " Creeps alive");
    //
}

function occasionalChecks() //These checks only need to be done every 24hours
{
    try {
    
    if(!Memory.oCheck || Memory.oCheck.timer <= 0) 
    {
        //Define all creep roles, if undefined, in memory
        if(!Memory.roles || _(Memory.roles).size() < 9) {
            Memory.roles = {
            grunt: 0,
            trucker: 0,
            miner: 0,
            loader: 0,
            builder: 0,
            upgrader: 0,
            meleeTank: 0,
            rangedAssassin: 0,
            healer: 0
            };
        }
        //
        
        // MEMORY LOG ALL SPAWNS (redefine)
        for(var i in Game.spawns) {
            Memory.spawns = Game.spawns;
        }
        //
        
        // (re)set the tick timer for this function
        if(!Memory.oCheck) {
            Memory.oCheck = {
                timer: 21600,
                activates: 1,
                ticksAlive: 0
            }
        } else {
            Memory.oCheck.timer = 21600;
            Memory.oCheck.activates ++;
        }
        //
        
        // Check in each controlled room for energy sources and store them in memory Rooms.sources
        if(_.size(Game.rooms) > _.size(Memory.rooms)) {
            Memory.rooms = Game.rooms;
            
            for(var i in Memory.rooms) {
                Memory.rooms[i].sources = {}
                let x = Game.rooms[i].find(FIND_SOURCES); //Find every energy source in selected room
                var idSource = [];
                for(var e in x) {
                    console.log(x[e].id);
                     
                    idSource.push(x[e].id);
                }
                Memory.rooms[i].sources = idSource; // Sources array pushed to memory
                
            }
        }
        //
        
        //Get & Set total amount of energy sources for creaction of miners
        if(!Memory.sourcesTotal) { //If the sources are not defined, create the memory log and fill it
            Memory.sourcesTotal = {};
            var sTotal = {};
            for(var i in Memory.rooms) { // For each room i control
                var eAmount = Memory.rooms[i].sources;
                //console.log(eAmount);
                for(var e in eAmount) { // For each source in selected room
                    sTotal[eAmount[e]] = {}; //Create object for the source
                    sTotal[eAmount[e]].used = false; // False/true statement if used by creep
                    sTotal[eAmount[e]].minerId = 0; //the name/id of the miner who is using it.
                    sTotal[eAmount[e]].sourceId = eAmount[e]; //the id of the source
                    //console.log(e);
                }
            }
            Memory.sourcesTotal = sTotal; //sets the object with sources into the memory version of it
        } else { //If the sources are already defined, then this checks if they are all defined, and if not adds the new ones without recreating the old ones
            console.log("Memory not redefined!");
            sTotal = {};
            for(var i in Memory.rooms){
                var e = Memory.rooms[i].sources;
                for(var x in e) {
                    if(!Memory.sourcesTotal[e[x]]) {
                        console.log("add new source")
                        sTotal[e[x]] = {};
                        sTotal[e[x]].used = false;
                        sTotal[e[x]].minerId = 0;
                        sTotal[e[x]].sourceId = e[x];
                    } else {
                        console.log("source " + e[x] + " is already added!");
                    }
                }
            }
            Memory.sourcesTotal = sTotal;
        }
        //
        
        console.log("Occasional check completed. Day: " + Memory.oCheck.activates);
    }
    }
    catch(err) {
        console.log(err);
    }
}






