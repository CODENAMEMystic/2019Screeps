module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        
        if (creep.memory.working == true && creep.carry.energy == 0) {
            
            creep.memory.working = false;
        }
        
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to the spawn or an extension
        if (creep.memory.working == true) {
            // find closest spawn or extension which is not full
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => s.energy < s.energyCapacity
            });

            // if we found one
            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
        }
        else {
            
            var sources = creep.room.find(FIND_SOURCES); //change later to be creep specific location
            var test = creep.memory.station;
            creep.say(sources[test].pos)
            
            if(creep.harvest(sources[test]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(sources[test]);
            }
        }
    }
};