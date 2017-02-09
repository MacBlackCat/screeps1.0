var spawn = Memory.spawns;

function filterRole(x) //Filters all creeps by their role (Memory.creeps[i].role) and returns the amount of creeps with X role
{
    var roleInt = _(Game.creeps).filter( { memory: {role: x } } ).size()
    if(roleInt) 
    {
        return roleInt; //returns the amount of creeps with role X
    } 
    else {
        return 0; //If no creeps with X role are found, return 0
    }
}

function spawnErr(x) //Translates spawning error codes into readable text
{
    switch(x) {
        case -1:
            console.log("ERR_NOT_OWNER");
            break;
        case -3:
            console.log("ERR_NAME_EXISTS");
            break;
        case -4:
            console.log("ERR_BUSY");
            break;
        case -6:
            console.log("ERR_NOT_ENOUGH_ENERGY");
            break;
        case -10:
            console.log("ERR_INVALID_ARGS");
            break;
        case -14:
            console.log("ERR_RCL_NOT_ENOUGH");
            break;
        case "666":
            console.log("Requested creep is undefined!");
            break;
        default:
            console.log("Error not recognized!");
    }
}

module.exports.spawnFunction = function checkSpawns() {
    try {
        console.log("checking spawns, please wait...")
        //console.log(spawn);
        
        for(var i in spawn) //loopt door elke element van Memory.spawns (van Game.spawns)
        {
            var e = spawn[i]; //changes String i into the Object e  -- test code -> console.log(e[0].name);
            //console.log(i);
            if(!e.spawning) { //Check if selected spawn is already busy
                createCreeps(i);
            } 
            else {
                console.log("Every spawn is already spawning!");
            }
        }
    }
    catch(err) {
        console.log(err);
    }
};


function createCreeps(selectedSpawn) 
{
    var mRoles = Memory.roles;
    
    function typeCreep(e) //spawns asked type creep
    {
        let roleType = spawnCreep(e ,selectedSpawn);
            if(_.isString(roleType)) //Check if creation is succes -> succes = noString/Object, error = String
            {
                mRoles[e] ++; //Memory log to log how many grunts were spawned of total lifetime 
                console.log(roleType); //logs name of creep
                Memory.creeps[roleType] = Game.creeps[roleType];
                Memory.creeps[roleType].role = e;
            } else {
                spawnErr(roleType); //Starts function to translate error code into text (retrieved from docs)
                if(roleType == -3) {
                    mRoles[e] ++;
                }
            }
    }
    
    try {
            console.log("spawning with " + selectedSpawn);
            //check for grunt creeps
            if( filterRole('grunt') < 3 //if grunts alive are less than 3 
                && _.size(Memory.creeps) < 4) // if total amount of creeps alive is less than 4
            {
                typeCreep('grunt');
            }
            //check RCL, if below level 2 than the next creeps cant be spawned
            else if(Game.spawns[selectedSpawn].room.controller.level >= 2 && Memory.statusCode == 1)
            {
                //Check for trucker creeps
                if( filterRole('trucker') < filterRole('miner')) //Makes sure that truckers only spawn when there are Miners who dont have a trucker yet
                {
                    typeCreep('trucker');
                }
                //Check for miner creeps
                else if(filterRole('miner') < _.size(Memory.sourcesTotal) ) {
                    typeCreep('miner');
                }
            } 
            //Enough grunts alive and RCL not high enough for next tier creeps
            else {
                console.log("---------- Enough grunts alive ------------");
            }
    }
    catch(err) {
        console.log(err);
    }
}

function createBody(bwork,bmove,bcarry,battack,branged,bheal,bclaim,btough) //creates array with the bodyparts
{
    var cBody = [];
    for (let i=0; i < bmove; i++) {
        cBody.unshift(MOVE);
    }
    for (let i=0; i < bwork; i++) {
        cBody.push(WORK);
    }
    for (let i=0; i < bcarry; i++) {
        cBody.push(CARRY);
    }
    for (let i=0; i < battack; i++) {
        cBody.push(ATTACK);
    }
    for (let i=0; i < branged; i++) {
        cBody.push(RANGED_ATTACK);
    }
    for (let i=0; i < bheal; i++) {
        cBody.push(HEAL);
    }
    for (let i=0; i < bclaim; i++) {
        cBody.push(CLAIM);
    }

    for (let i=0; i < btough; i++) {
        cBody.unshift(TOUGH);
    }
    return cBody;
}

function spawnCreep(x, sSpawn) 
{
    var mRoles = Memory.roles;
    switch(x)
    {
        case "grunt":                                   //    W M C A R H C T
            return Game.spawns[sSpawn].createCreep(createBody(1,1,1,0,0,0,0,0), ("Grunt" + mRoles.grunt), {role: "grunt"});
            break;
            
        // Mining operation creeps
        case "trucker":
            return Game.spawns[sSpawn].createCreep(createBody(0,3,6,0,0,0,0,0), ("Trucker" + mRoles.trucker), {role: "trucker"});
            break;
        case "miner":
            return Game.spawns[sSpawn].createCreep(createBody(5,1,0,0,0,0,0,0), ("Miner" + mRoles.miner), {role: "miner"});
            break;
        //
            
        // Infrastructure creeps
        case "loader":
            return Game.spawns[sSpawn].createCreep(createBody(0,2,4,0,0,0,0,0), ("Loader" + mRoles.loader), {role: "loader"});
            break;
        case "builder":
            return Game.spawns[sSpawn].createCreep(createBody(2,3,4,0,0,0,0,0), ("Builder" + mRoles.builder), {role: "builder"});
            break;
        case "upgrader":
            return Game.spawns[sSpawn].createCreep(createBody(2,1,4,0,0,0,0,0), ("Upgrader" + mRoles.upgrader), {role: "upgrader"});
            break;
        //
            
        // Defense/Attack creeps
        case "meleeTank":
            return Game.spawns[sSpawn].createCreep(createBody(1,1,1,0,0,0,0,0), ("Tank" + mRoles.meleeTank), {role: "meleeTank"});
            break;
        case "rangedAssassin":
            return Game.spawns[sSpawn].createCreep(createBody(1,1,1,0,0,0,0,0), ("Shooter" + mRoles.rangedAssassin), {role: "rangedAssassin"});
            break;
        case "healer":
            return Game.spawns[sSpawn].createCreep(createBody(1,1,1,0,0,0,0,0), ("Healer" + mRoles.healer), {role: "healer"});
            break;
        //
        
        default:
            return "666";
    }
}

/* TO DO

DONE    - elke creep definen -> body + naam + memory.rol
DONE    - memory vars maken voor bijhouden namen/hoeveelheid aka creep.name = (totaal lifetime gespawnde creeps) = variable getal
        - creeps spawnen op basis van beschikbare energy + RCL + welke creeps in leven zijn

*/