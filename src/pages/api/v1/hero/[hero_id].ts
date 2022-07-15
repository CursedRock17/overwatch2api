import { NextApiRequest, NextApiResponse } from "next";

const heroes = [
    {
       id: 1,
       name: "Ana" ,
       health: 200,
       
       weapon: {
        name: "Biotic Rifle",
        damage: 70,
        ammo: 14,
        projectile_speed: 125,
        rate_of_fire: 1.25,
        reload_time: 1.5,
       },
       abilities: {
         ability_one: {
            name: "Sleep Dart",
            damage: 5,
            description: "Render an enemy useless for up to 5 seconds, but they can be awoken by getting shot at",
            cooldown: 15,
            projectle_speed: 60,
            duration: 5,
         },
         ability_two: {
            name: "Biotic Grenade",
            damage: 60,
            healing: 100,
            description: "When thrown, the grenade heals allies for 60 applying a boost to their future heals while in effect and damages enemies for 60 making them unable to be healed while the status is in effect ",
            cooldown: 10,
            duration: 4,
            projectile_speed: 30,
         }
       },
       ultimate: {
        name: "Nano Boost",
        description: "Increase Damage, Health Resistance, and give allies 250 instant health",
        healing: 250,
        damage_reduction: "50%",
        duration: 8,
        cost: 2100,
        range: 40,
       },
       age: 60,
       affiliation: "Overwatch",
       role: "Support",
       nationality: "Egyptian",
    }, 

    {
        id: 2,
        name: "Ashe" ,
        health: 200,
        
        weapon: {
            name: "The Viper",
            damage_unscoped: 40,
            damage_scoped: 75,
            ammo: 12,
            rate_of_fire_unscoped: 4,
            rate_of_fire_scoped: 1.54,
            reload_time: 3.5,
        },
        abilities: {
          ability_one: {
            name: "Dynamite",
            burn_damage: 100,
            explosion_damage: 50,
            description: "Throw a piece of dynamite which can be shot at to explode and deal burn damage in a 5 meter radius",
            cooldown: 12,
            projectle_speed: 25,
            duration: 5,
            area_of_effect: 5,
          },
          ability_two: {
             name: "Coach Gun",
             damage: 90,
             description: "When shot the Coach Gun deals knockback to the users allowing them to gain movement",
             cooldown: 10,
          }
        },
        ultimate: {
         name: "B.O.B.",
         description: "Call in B.O.B. a robot which runs until it hits a solid surface or player in which he then begins to autolock and shoot his enemies",
         health: 1000,
         damage: {
            charge: 120,
            arm: 112,
         },
         duration: 10,
         cost: 2240,
         range: 70,
        },
        age: 39,
        affiliation: "Deadlock Gang",
        role: "Damage",
        nationality: "American",
     }, 

     {
        id: 3,
        name: "Baptiste" ,
        health: 200,
        weapon: {
            name: "Biotic Launcher",
            damage: 24,
            ammo: 45,
            rate_of_fire_damage: 1.72,
            rate_of_fire_healing: 1.11,
            area_of_effect_healing: 3,
            healing_explosion: 50,
            healing_direct: 70,
            reload_time: 1.5,
            range: 20,
        },
        abilities: {
          ability_one: {
            name: "Regenerative Burst",
            healing: 100,
            description: "Over time heal teamates in a small area",
            cooldown: 13,
            duration: 5,
            area_of_effect: 10,
          },
          ability_two: {
             name: "Immortality Field",
             health: 150,
             description: "Prevent Teamates from going below 10% of their health for those in the area of the field",
             cooldown: 25,
             healing: "10%",
             area_of_effect: 6.5,
             duration: 5.5
          }
        },
        ultimate: {
         name: "Amplification Matrix",
         description: "Boost effectiveness of all friendly projectiles that go through this window",
         damage: "100%",
         healing: "100%",
         duration: 10,
         cost: 2310,
         area_of_effect: 45,
        },
        age: 36,
        affiliation: "Overwatch",
        role: "Support",
        nationality: "Haitian",
     }, 

     {
        id: 4,
        name: "Bastion" ,
        health: 200,
        armour: 100,
        weapon: {
            name: "Configuration:Recon",
            max_falloff: 40,
            damage: 25,
            ammo: 25,
            rate_of_fire: 5,
            reload_time: 1.5,
        },
        abilities: {
          ability_one: {
            name: "Configuration:Assault",
            damage: 12,
            description: "Bastion turns into a tank where he has the turrent but is slowly mobile",
            cooldown: 10,
            duration: 6,
            rate_of_fire: 30,
            move_speed: "-65%"
            
          },
          ability_two: {
             name: "A-36 Tactical Grenade",
             description: "Bastion Shoots a grenade which can bounce once",
             damage: 120,
             cooldown: 8
          }
        },
        ultimate: {
         name: "Configuration:Artillery",
         description: "Bastion turns into a mortar in which he fires 3 shells, these shells do exposive damage when landing back down from the sky",
         ammo: 3,
        },
        age: 30,
        affiliation: "None",
        role: "Damage",
        nationality: "Omnic",
     }, 

     {
        id: 5,
        name: "Brigitte" ,
        health: 150,
        armour: 50,
        passive: {
          name: "Inspire",
          healing: 15,
          area_of_effect: 20,
          duration: 6,
          cooldown: 1,  
        },
        weapon: {
            name: "Rocket Flail",
            damage: 35,
            ammo: 35,
            range: 6,
            rate_of_fire: 1.67,
            cast_time: 0.2

        },
        abilities: {
          ability_one: {
            name: "Repair Pack",
            healing: 55,
            description: "Throw a teamate a small amount of health",
            cooldown: 6,
            charges: 3,
            duration: 2,
            projectile_speed: 45,
          },
          ability_two: {
             name: "Whip Shot",
             damage: 70,
             cast_time: 0.2,
             description: "Send the rocket flail flying into a emey from range, dealing both damage and knockback",
             range: 20,
             cooldown: 4,
          }
        },
        ability_three: {
            name: "Shield Bash",
            damage: 50,
            description: "Dash Forward stunning a single enemy on contact",
            cooldown: 5,
            area_of_effect: 60,
            range: 12,
            move_speed: "500",
        },
        ultimate: {
         name: "Rally",
         description: "Brigitte moves faster and buffs allies in range with armor until removed via damage",
         healing: 30,
         move_speed: "30%",
         cost: 2800,
         area_of_effect: 8.5,
         duration: 10,
        },
        age: 23,
        affiliation: "Overwatch",
        role: "Support",
        nationality: "Swedish",
     }, 
     
     {
        id: 6,
        name: "Cassidy" ,
        health: 225,
        
        weapon: {
            name: "Peacekeeper",
            max_falloff: 40,
            damage: 70,
            ammo: 6,
            rate_of_fire: 2,
            reload_time: 1.5,
            damage_secondary: 50,
            rate_fire_secondary: 46.15,

        },
        abilities: {
          ability_one: {
            name: "Combat Roll",
            description: "Roll in one direction for a short amount of time",
            cooldown: 6,
            duration: 0.4,
            move_speed: 15,
            damage_reduction: "50%"
          },
          ability_two: {
             name: "Magnetic Grenade",
             damage: 131,
             cast_time: 0.35,
             description: "Throw a grenade which can get connected to an enemy dealing a quick burst of damage",
             area_of_effect: 10,
             range: 7,
             cooldown: 10,
             duration: 0.8,
          }
        },
        ultimate: {
         name: "Deadeye",
         description: "Charge up the peacekeeper to deal massive amounts of damage in each of the 6 rounds",
         range: 200,
         rate_of_fire: 1.2,
         duration: 7,
         damage: 130,
         cost: 1848,
         move_speed: "-70%"
        },
        age: 37,
        affiliation: "Overwatch",
        role: "Damage",
        nationality: "American",
     }, 

     {
        id: 7,
        name: "D.Va (Mech)" ,
        health: 350,
        armor: 300,
        weapon: {
            name: "Fusion Cannons",
            range: 20,
            damage: 2,
            rate_of_fire: 6.67,
            move_speed: "-40%"

        },
        abilities: {
          ability_one: {
            name: "Defensive Matrix",
            description: "Erase all incoming projectiles that enter the display, the objects just become removed fron the game without consequence",
            cooldown: 1,
            duration: 2,
            range: 10,
          },
          ability_two: {
             name: "Boosters",
             damage: 10,
             description: "Engage the rockets on the back of the mech in order to fly in 360 degrees for up to 2 seconds",
             cooldown: 4,
             duration: 2,
             range: 23.98,
             move_speed: "+118%"
          },
          ability_three: {
            name: "Micro Missles",
            damage: 7,
            ammo: 18,
            description: "Fire out 18 miniture missiles which all do some form of splash damage",
            cooldown: 8,
            duration: 2,
            area_of_effect: 1.5,
            rate_of_fire: 11,
            cast_time: 0.25,
         }
       },
        ultimate: {
         name: "Self-Destruct",
         description: "The mech causes a huge destruction and acts like a ragdoll just thrown down staying there",
         cost: 1540,
         area_of_effect: 20,
         cast_time: 3,
         damage: 1000,
        },
        age: 19,
        affiliation: "South-Korean Army",
        role: "Tank",
        nationality: "Korean",
     }, 

     {
        id: 8,
        name: "D.Va (Pilot)" ,
        health: 150,
        
        weapon: {
            name: "Light Gun",
            projectile_speed: 50,
            damage: 14,
            ammo: 20,
            rate_of_fire: 7,
            reload_time: 1.4,

        },
        ultimate: {
         name: "Call Mech",
         description: "Call D.Va's mech back to here, so she can reengage in the fight",
         range: 2.5,
         cast_time: 2,
         damage: 250,
         cost: 319.2,
        },
        age: 19,
        affiliation: "South-Korean Army",
        role: "Tank",
        nationality: "Korean",
     }, 

     {
         id: 9,
         name: "Doomfist" ,
         health: 450,
         age: 45,
         affiliation: "Talon",
         role: "Tank",
         nationality: "Nigerian",
         passive: {
            name: "The Best Defense",
            description: "Gain 30 temporary shields per enemy hit with any of his 3 abilities, with a maximum of 150 shields"
         },
         weapon: {
            name: "Hand Cannon",
            max_falloff: 30,
            damage: 66,
            ammo: 4,
            rate_of_fire: 3,
            reload_time: 0.4,
            projectile_speed: 80
        },
        abilities: {
          ability_one: {
            name: "Seismic Slam",
            description: "Leap in any direction landing and dealing damage in a radius",
            cooldown: 6,
            area_of_effect: 8,
            move_speed: 25,
            damage: 50,
          },
          ability_two: {
             name: "Power Block",
             damage_reduction: "80%",
             description: "Reduce all incoming damage by 90%",
             move_speed: "65%",
             cooldown: 10,
             duration: 0.8,
          },
          ability_three: {
            name: "Rocket Punch",
            min_damage: 35,
            max_damage: 70,
            description: "Use Doomfist's fist to charge and knock enemies back dealing damage on hit and impact with any surface",
            cooldown: 4,
            cast_time: 1,
            stun_duration: 0.5,
         }
        },
        ultimate: {
         name: "Meteor Strike",
         description: "Jump into the air, phasing out of the game, landing and striking in a zone",
         range: 8,
         inner_damage: 300,
         outer_damage: 100,
         cost: 1680,
         duration: 4,
         cast_time: 0.5,
         move_speed: 16.5
        },
     }, 

     {
        id: 10,
        name: "Echo" ,
        health: 200,
        affiliation: "Overwatch",
        role: "Damage",
        nationality: "Robot",
        passive: {
           name: "Glide",
           description: "When falling holding jump reduces vertical movement speed and boost horizontal movement speed"
        },
        weapon: {
           name: "Tri-Shot",
           pellet_number: 3,
           damage: 51,
           ammo: 12,
           rate_of_fire: 3,
           reload_time: 1.5,
           projectile_speed: 75
       },
       abilities: {
         ability_one: {
           name: "Sticky Bombs",
           description: "Fire 6 bombs which can stick to targets, exploding after a certain amount of time",
           Damage:{
            bombs: 6,
            impact: 5,
            explosion: 25,
            self: 12.5
        },
           cooldown: 6,
           area_of_effect: 2,
           projectile_speed: 50,
           cast_time: 1,
         },
         ability_two: {
            name: "Flight",
            description: "Echo surges forward quickly, then can fly freely.",
            move_speed: 8,
            cooldown: 6,
            duration: 3,
         },
         ability_three: {
           name: "Focusing Beam",
           description: "Echo channels a beam for a few seconds, dealing very high damage to targets with less than half health.",
           damage: 50,
           damage_low: 175,
           cooldown: 8,
           range: 16,
           duration: 2,
        }
       },
       ultimate: {
        name: "Duplicate",
        description: "Echo duplicates a targeted enemy hero and gains use of their abilities.",
        range: 40,
        cost: 2254,
        max_tank_health: 300,
        duration: 15,
        cast_time: 0.35,
       },
    },

    {
        id: 11,
        name: "Genji" ,
        health: 200,
        
        age: 35,
        affiliation: "Overwatch",
        role: "Damage",
        nationality: "Japanese",
        passive: {
           name: "Cyber-Agility",
           description: "Climb on walls and double jump."
        },
        weapon: {
           name: "Shuriken",
           damage: 29,
           ammo: 30,
           rate_of_fire: 3.24,
           ammo_usage: 3,
           reload_time: 1.5,
           projectile_speed: 60,
       },
       abilities: {
         ability_one: {
           name: "Swift Strike",
           description: "Genji darts forward, slashing with his wakizashi and passing through foes in his path. If Genji eliminates a target, he can instantly use this ability again.",
           Damage: 50,
           cooldown: 8,
           range: 15,
           move_speed: 50,
           duration: 0.3,
         },
         ability_two: {
            name: "Deflect",
            description: "With lightning-quick swipes of his wakizashi, Genji reflects an oncoming projectile and sends it rebounding towards his opponent.",
            cooldown: 8,
            duration: 2,
            area_of_effect: 1,
         },
       },
       ultimate: {
        name: "Dragonblade",
        description: "Genji brandishes his katana for a brief period of time. Until he sheathes his katana, Genji can deliver killing strikes to any targets within his reach.",
        damage: 110,
        cost: 1932,
        duration: 6,
        cast_time: 1,
        range: 5,
       },
    },


    {
        id: 12,
        name: "Hanzo" ,
        health: 200,
        age: 38,
        affiliation: "Shimada Clan",
        role: "Damage",
        nationality: "Japanese",
        passive: {
           name: "Wall Climb",
           description: "Climb on walls"
        },
        weapon: {
           name: "Storm Bow",
           min_damage: 27.2,
           max_damage: 125,
           rate_of_fire: 1.33,
           projectile_speed: 110,
       },
       abilities: {
         ability_one: {
           name: "Sonic Arrow",
           description: "Hanzo launches an arrow that contains a sonar tracking device. Any enemy within its detection radius is visibly marked, making them easier for Hanzo and his allies to hunt down.",
           area_of_effect: 9,
           cooldown: 12,
           duration: 6,
         },
         ability_two: {
            name: "Storm Arrows",
            description: "Hanzo’s next several arrows fire instantly, but at reduced damage.",
            cooldown: 10,
            duration: 5,
            damage: 65,
            ammo: 5,
            rate_of_fire: 4,
            projectile_speed: 110,
         },
         ability_three: {
            name: "Lunge",
            description: "Hanzo can double jump, allowing him to change direction mid-jump.",
            cooldown: 5,
            move_speed: 15,
            range: 7.85,
         },
       },
       ultimate: {
        name: "Dragonstrike",
        description: "Hanzo summons a Spirit Dragon which travels through the air in a line. It passes through walls in its way, devouring any enemies it encounters.",
        damage: 300,
        cost: 1680,
        projectile_speed: 20,
        area_of_effect: 4,
        cast_time: 1.5,
       },
    },
    
    {
        id: 13,
        name: "Junkrat" ,
        health: 200,
        age: 25,
        affiliation: "Junkers",
        role: "Damage",
        nationality: "Australian",
        passive: {
           name: "Total Mayhem",
           description: "Junkrat's deranged sense of humor persists past his death. If killed, he drops several live grenades.",
           damage: 300,
           grenades: 6,
           cast_time: 0.7,
        },
        weapon: {
           name: "Frag Launcher",
           direct_damage: 120,
           splash_damage: 80,
           rate_of_fire: 1.33,
           ammo: 5,
           projectile_speed: 25,
           area_of_effect: 2,
           reload_time: 1.5,
       },
       abilities: {
         ability_one: {
           name: "Concussion Mine",
           description: "After placing one of his homemade Concussion Mines, Junkrat can trigger it to damage enemies and send them flying... or propel himself through the air.",
           area_of_effect: 3,
           health: 25,
           cooldown: 8,
           min_damage: 30,
           max_damage: 120,
           ammo: 2,
           cast_time: 0.1
         },
         ability_two: {
            name: "Steel Trap",
            description: "Junkrat tosses out a giant, metal-toothed trap. Should an enemy wander too close to the trap, it clamps on, injuring and immobilizing them.",
            cooldown: 10,
            projectile_speed: 15,
            stun_duration: 3,
            damage: 100,
            health: 100,
            area_of_effect: 1,
         },
       },
       ultimate: {
        name: "RIP-Tire",
        description: "Junkrat revs up a motorized tire bomb and sends it rolling across the battlefield, climbing over walls and obstacles. He can remotely detonate the RIP-Tire to deal serious damage to enemies caught in the blast, or just wait for it to explode on its own.",
        min_damage: 50,
        max_damage: 600,
        cost: 1925,
        move_speed: 12,
        area_of_effect: 10,
        cast_time: 1,
        duration: 10,
       },
    },

    {
        id: 14,
        name: "Lucio" ,
        health: 200,
        age: 26,
        affiliation: "Overwatch",
        role: "Support",
        nationality: "Brazilian",
        passive: {
           name: "Wall Ride",
           description: "Jump onto a wall to ride along it.",
           move_speed: "+30%",
        },
        weapon: {
           name: "Sonic Amplifier",
           damage: 80,
           rate_of_fire: 1,
           ammo: 20,
           projectile_speed: 50,
           reload_time: 1.5,
       },
       abilities: {
         ability_one: {
           name: "Soundwave",
           description: "Lúcio can knock his enemies back with a blast of sound.",
            range: 8,
            cooldown: 4,
            damage: 25
         },
         ability_two: {
            name: "Crossfade",
            description: "Lúcio continuously energizes himself — and nearby teammates — with music. He can switch between two songs: one amplifies movement speed, while the other regenerates health.",
            healing: "16",
            move_speed: "+25%",
            cast_time: 0.8,
            area_of_effect: 12,
         },
         abilitiy_three: {
            name: "Amp it Up",
            description: "Lúcio increases the volume on his speakers, boosting the effects of his songs.",
            healing: 52,
            move_speed: "+60%",
            area_of_effect: 12,
            duration: 3,
            cooldown: 12,
        }
       },
       ultimate: {
        name: "Sound Barrier",
        description: "Protective waves radiate out from Lúcio’s Sonic Amplifier, briefly providing him and nearby allies with personal shields.",
        cost: 2394,
        area_of_effect: 30,
        cast_time: 0.72,
        duration: 7,
        health: 750,
       },
    },

    {
        id: 15,
        name: "Mei" ,
        health: 250,
        age: 31,
        affiliation: "Overwatch",
        role: "Damage",
        nationality: "Chinese",
        weapon: {
           name: "Endothermic Blaster",
           primary_damage: 100,
           secondary_damage: 75,
           primary_range: 10,
           freeze_duration: 1.3,
           ammo: 150,
           primary_projectile_speed: 20,
           secondary_projectile_speed: 115,
           reload_time: 1.5,
       },
       abilities: {
         ability_one: {
           name: "Cryo-Freeze",
           description: "Mei instantly surrounds herself with a block of thick ice. She heals and ignores damage while encased, but cannot move or use abilities.",
            duration: 4,
            cooldown: 12,
            healing: 200,
            ammo_restore: 60,
         },
         ability_two: {
            name: "Ice Wall",
            description: "Mei generates an enormous ice wall that obstructs lines of sight, stops movement, and blocks attacks.",
            health: 1000,
            range: 20,
            cooldown: 12,
            duration: 5,
         },
       },
       ultimate: {
        name: "Blizzard",
        description: "Mei deploys a weather-modification drone that emits gusts of wind and snow in a wide area. Enemies caught in the blizzard are slowed and take damage; those who linger too long are frozen solid.",
        cost: 1851,
        area_of_effect: 10,
        cast_time: 0.5,
        duration: 4.25,
        damage: 85,
       },
    },

    {    
        id: 16,
        name: "Mercy" ,
        health: 200,
        age: 37,
        affiliation: "Overwatch",
        role: "Support",
        nationality: "Swiss",
        passives: {
            passive_one: {
                name: "Regeneration",
                description: "Mercy automatically heals over time.",
                healing: 30,
            },
            passive_two: {
                name: "Angelic Descent",
                description: "Propelled by her Valkyrie suit, Mercy slows the speed of her descent from great heights.",
                vertical_move_speed: 2,
            }
        },
        weapons: {
           weapon_one: {
                name: "Caduceus Staff",
                damage_boost: "+30%",
                healing: 55,
                range: 15
           },
           weapon_two: {
                name: "Caduceus Blaster",
                damage: 20,
                rate_of_fire: 5,
                ammo: 20,
                projectile_speed: 50,
                reload_time: 1.4
           },
       },
       abilities: {
         ability_one: {
            name: "Guardian Angel",
            description: "Mercy flies towards a targeted ally, allowing her to reach them quickly and provide assistance in crucial moments.",
            range: 30,
            move_speed: 17,
            cooldown: 1.5,
         },
         ability_two: {
            name: "Resurrect",
            description: "Mercy brings a dead ally back into the fight with full health.",
            range: 5,
            cooldown: 30,
            move_speed: "-75%",
            cast_time: 1.75,
         },
       },
       ultimate: {
        name: "Valkyrie",
        description: "Gain the ability to fly. Mercy’s abilities are enhanced.",
        cost: 1820,
        cast_time: 0.5,
        duration: 15,
        range: 10,
        move_speed: 9,
        healing: 60,
       },
    },

    {    
        id: 17,
        name: "Moira" ,
        health: 200,
        age: 48,
        affiliation: "Talon",
        role: "Support",
        nationality: "Irish",
        weapon: {
            name: "Biotic Grasp",
            healing: 70,
            damage: 50,
            self_healing: 20,
            healing_range: 15,
            damage_range: 20,
            duration: 2,
            ammo: 160,
            ammo_used: 12.5
       },
       abilities: {
         ability_one: {
            name: "Biotic Orb",
            description: "Moira launches a rebounding biotic spehere that can heal teamates.",
            range:40,
            duration: 7,
            cooldown: 10,
            healing_capacity: 250,
            projectile_speed: 20,
         },
         ability_two: {
            name: "Necrotic Orb",
            description: "Fire an orb which puts a weaken status effect on to enemies",
            damage: 50,
            area_of_effect: 3,
            damage_reduction: "-75%",
            cooldown: 16,
         },
         abilitiy_three: {
            name: "Fade",
            description: "Moira's movement speed increases while making her invulnerable to damage.",
            cooldown: 7,
            duration : 0.8,
            range: 15,
            move_speed: "+250%"
         }
       },
       ultimate: {
        name: "Coalescence",
        description: "Moira channels a long-range beam that heals allies, damages enemies, and bypasses barriers.",
        cost: 2800,
        cast_time: 0.5,
        duration: 8,
        range: 30,
        damage: 70,
        healing: 140,
        healing_self: 50,
        move_speed: "+50%"
       },
    },

    {    
        id: 18,
        name: "Orisa" ,
        health: 250,
        armour: 250,
        age: 1,
        affiliation: "Numbain",
        role: "Tank",
        nationality: "Numbanian",
        weapon: {
            name: "Augemnted Fusion Driver",    
            damage: 12,
            rate_of_fire: 10,
            move_speed: "-30%",
            projectile_speed: 120,
            critical_damage: "+100%",
            range: 25
       },
       abilities: {
         ability_one: {
            name: "Energy Javelin",
            description: "Orisa throws a javelin which deals knockback damage",
            projectile_speed: 20,
            damage: 60,
            cooldown: 8,
            stun_duration: 0.2,
         },
         ability_two: {
            name: "Fortify",
            description: "Orisa takes significantly less damage",
            health: 125,
            damage_reduction: 40,
            duration: 4.5,
            cooldown: 10,
            heat_reduction: 50
         },
         abilitiy_three: {
            name: "Javelin Spin",
            description: "Spin your javelin to destroy projectiles, push enemies, and increase forward speed.",
            cooldown: 7,
            damage: 90,
            duration : 1.75,
            move_speed: "+50%"
         }
       },
       ultimate: {
        name: "Terra Surge",
        description: "Sweep in enemies and anchor down, gaining the effects of Fortify and charging up a surge of damage. Use Primary Fire to unleash the surge early.",
        cost: 2800,
        cast_time: 0.5,
        duration: 4,
        area_of_effect: 10,
        damage: 500,
       },
    },
     

    {    
        id: 19,
        name: "Pharah" ,
        health: 200,
        
        age: 32,
        affiliation: "Overwatch",
        role: "Damage",
        nationality: "Egyptian",
        passive: {
            name: "Hover Jets",
            description: "Hold to hover",
            duration: 2,
            move_speed: "+20%"
        },
        weapon: {
            name: "Rocket Launcher",    
            damage: 120,
            rate_of_fire: 1.17,
            area_of_effect: 2.5,
            projectile_speed: 35,
            ammo: 6,
            reload__time: 1.5
       },
       abilities: {
         ability_one: {
            name: "Jump Jet",
            description: "Propelled by her suit's thrusters, Pharah soars high into the air.",
            range: 11.55,
            cooldown: 10
         },
         ability_two: {
            name: "Concussion Blast",
            description: "Pharah looses a wrist rocket that knocks back any enemies it strikes.",
            cooldown: 9,
            damage: 30,
            area_of_effect: 8,
            projectile_speed: 60
         },
       },
       ultimate: {
        name: "Barrage",
        description: "Pharah directs a continuous salvo of mini-rockets to destroy groups of enemies.",
        cost: 2100,
        area_of_effect: 2,
        projectile_speed: 45,
        rate_of_fire: 30,
        duration: 2.5,
       },
    },
    

    {    
        id: 20,
        name: "Reaper" ,
        health: 250, 
        age: 58,
        affiliation: "Talon",
        role: "Damage",
        nationality: "American",
        passive: {
            name: "The Reaping",
            description: "Reaper steals health from his enemies as he damages them.",
            healing: "35%"
        },
        weapon: {
            name: "Hellfire Shotguns",    
            damage: 110,
            rate_of_fire: 2,
            ammo: 8,
            reload__time: 1.5,
            range: 20,
       },
       abilities: {
         ability_one: {
            name: "Wrait Form",
            description: "Reaper becomes a shadow for a short period of time. While in this form, he takes no damage and is able to pass through enemies, but cannot fire his weapons or use other abilities.",
            duration: 3,
            cooldown: 8,
            move_speed: "+50%"
         },
         ability_two: {
            name: "Shadow Step",
            description: "After marking a destination, Reaper disappears and reappears at that location.",
            cooldown: 10,
            range: 35,
            duration: 2,
            cast_time: 1.5,
         },
       },
       ultimate: {
        name: "Death Blossom",
        description: "In a blur of motion, Reaper empties both Hellfire Shotguns at breakneck speed, dealing massive damage to all nearby enemies.",
        cost: 2100,
        damage: 170,
        move_speed: "-50%",
        area_of_effect: 8,
        duration: 3
       },
    },
    

    {    
        id: 21,
        name: "Reinhardt" ,
        health: 325,
        armour: 300,
        age: 61,
        affiliation: "Overwatch",
        role: "Tank",
        nationality: "German",
        weapon: {
            name: "Rocket Hammer",    
            damage: 85,
            rate_of_fire: 1,
            range: 5,
            cast_time: 0.432
       },
       abilities: {
         ability_one: {
            name: "Barrier Field",
            description: "Reinhardt projects a broad, forward-facing energy shield, which can absorb substantial damage before it is destroyed. Though Reinhardt can protect himself and his companions behind the shield, he cannot attack while sustaining it.",
            move_speed: "-30%",
            health: 1200,
            cooldown: 5,
            healing: 144,
         },
         ability_two: {
            name: "Charge",
            description: "Reinhardt charges forth in a straight line, grabbing hold of enemies in his path. If he collides with a wall, foes he’s carrying suffer extreme damage.",
            damage: 50,
            pin_damage:2250,
            range: 49.5,
            cast_time: 0.6,
            duration: 3.65,
            cooldown: 8,
            move_speed: "+200%"
         },
         ability_three: {
            name: "Fire Strike",
            description: "By whipping his Rocket Hammer forward, Reinhardt slings a flaming projectile which pierces and damages any enemies it touches.",
            ammo: 2,
            damage: 90,
            projectile_speed: 25,
            cast_time: .48,
         }
       },
       ultimate: {
        name: "Earthshatter",
        description: "Reinhardt forcefully slams his rocket hammer into the ground, knocking down and damaging all enemies in front of him.",
        cost: 1540,
        range: 20,
        damage: 50,
        close_damage: 200,
        cast_time: .45,
        duration: 2.5
       },
    },

    {    
        id: 22,
        name: "Roadhog" ,
        health: 700,
        
        age: 48,
        affiliation: "Junkers",
        role: "Tank",
        nationality: "Austrailian",
        weapon: {
            name: "Scrap Gun",    
            min_damage: 49.5,
            max_damage: 165,
            rate_of_fire: 1.18,
            range: 30,
            ammo: 5,
            reload_time: 2,
            projectile_speed: 80,
       },
       abilities: {
         ability_one: {
            name: "Take a Breather",
            description: "Roadhog restores a chunk of his health over a brief period of time.",
            healing: 350,
            cooldown: 8,
            duration: 1,
            cast_time: 0.5,
            damage_reduction: 50,
         },
         ability_two: {
            name: "Chain Hook",
            description: "Roadhog hurls his chain at a target; if it catches, he yanks them into close range.",
            damage: 30,
            cooldown: 8,
            projectile_speed: 40,
            range: 20,
            cast_time: 0.3
         },
       },
       ultimate: {
        name: "Whole Hog",
        description: "After cramming a top-loader onto his Scrap Gun, Roadhog pours in ammo. For a short time, he can crank out a stream of shrapnel that knocks back enemies.",
        cost: 2240,
        damage: 4928,
        cast_time: .5,
        duration: 5.5,
        move_speed: "-25%",
        rate_of_fire: 128,
       },
    },

    {    
        id: 23,
        name: "Sigma" ,
        health: 300,
        armour: 200,
        age: 62,
        affiliation: "Talon",
        role: "Tank",
        nationality: "Dutch",
        weapon: {
            name: "Hyperspheres",    
            damage: {
              direct: 55,
              splash: 30,  
            },
            rate_of_fire: .67,
            range: 22,
            area_of_effect: 3,
            projectile_speed: 50,
       },
       abilities: {
         ability_one: {
            name: "Experimental Barrier",
            description: "Sigma propels a floating barrier to a location of his choosing. He can retrieve the barrier at any time.",    
            health: 700,
            reacll_cooldown: 2,
            destroyed_cooldown: 5,
            projectile_speed: 16.5,
         },
         ability_two: {
            name: "Kinetic Grasp",
            description: "Sigma freezes incoming projectiles in midair, converting them into shields.",
            health: "60%",
            cooldown: 12,
            range: 3,
            duration: 2,
         },
         ability_three: {
            name: "Accretion",
            description: "Sigma gathers a mass of debris and flings it at an enemy to knock them down.",
            damage: {
                direct: 100,
                splash: 40,
                self: 20
            },
            move_speed: "-75%",
            projectile_speed: 37.5,
            area_of_effect: 2.5,
            cast_time: 0.65,
            duration: 0.8,
            cooldown: 10
         }
       },
       ultimate: {
        name: "Gravitic Flux",
        description: "Unleashing his full powers, Sigma takes flight, lifts enemies in a targeted area, and launches them into the sky before slamming them back down.",
        cost: 1960,
        initial_damage: 50,
        damage: "50%",
        cast_time: 0.6,
        duration: 5,
        move_speed: 7.15,
        range: 35,
        area_of_effect: 35,
       },
    },

    {    
        id: 24,
        name: "Soldier: 76" ,
        health: 200,
        
        age: 53,
        affiliation: "Overwatch",
        role: "Damage",
        nationality: "American",
        weapon: {
            name: "Heavy Pulse Rifle",    
            damage: 20,
            rate_of_fire: 9,
            range: 50,
            reload_time: 1.5,
            ammo: 30
       },
       abilities: {
         ability_one: {
            name: "Helix Rockets",
            description: "Tiny rockets spiral out of Soldier: 76’s Pulse Rifle in a single burst. The rockets’ explosion damages enemies in a small radius.",    
            damage: {
                direct: 120,
                splash: 80,
                self: 40
            },
            projectile_speed: 50,
            area_of_effect: 3,
            cooldown: 6
         },
         ability_two: {
            name: "Sprint",
            description: "Whether he needs to evade a firefight or get back into one, Soldier: 76 can rush ahead in a burst of speed. His sprint ends if he takes an action other than charging forward.",
            move_speed: "+50%"
         },
         ability_three: {
            name: "Biotic Field",
            description: "Soldier: 76 plants a biotic emitter on the ground. Its energy projection restores health to 76 and any of his squadmates within the field.",
            healing: 35,
            area_of_effect: 4.5,
            duration: 5,
            cooldown: 15
         },
       },
       ultimate: {
        name: "Tactical Visor",
        description: "Soldier: 76’s pinpoint targeting visor “locks” his aim on the threat closest to his crosshairs. If an enemy leaves his line of sight, Soldier: 76 can quickly switch to another target.",
        cost: 2310,
        cast_time: 1.2,
        duration: 6,
       },
    },


{    
        id: 25,
        name: "Sombra" ,
        health: 200,
        age: 30,
        affiliation: "Talon",
        role: "Damage",
        nationality: "Mexican",
        passive: {
            name: "Opportunist",
            description: "Sombra detects critically injured enemies through walls.",
            damage_boost: "+40%"
        },
        weapon: {
            name: "Machine Pistol",    
            damage: 7,
            rate_of_fire: 20,
            range: 35,
            reload_time: 1.4,
            ammo: 60
       },
       abilities: {
         ability_one: {
            name: "Hack",
            description: "Sombra hacks enemies to temporarily stop them from using their abilities, or hacks first aid kits to make them useless to her opponents.",    
            range: 15,
            cast_time: 0.85,
            cooldown: 4,
            duration: 10,
            health_pack_duration: 30,
            lock_duration: 1,
            reveal_time: 8
         },
         ability_two: {
            name: "Stealth",
            description: "Sombra becomes invisible for a short period of time, during which her speed is boosted considerably. Attacking, using offensive abilities, or taking damage disables her camouflage.",
            move_speed: "+65%",
            cooldown: 6,
            cast_time: 0.375
         },
         ability_three: {
            name: "Translocator",
            description: "Sombra tosses out a translocator beacon. She can instantly return to the beacon’s location while it is active (including when it’s in mid-flight).",
            health: 5,
            cooldown: 6,
            projectile_speed: 25,
         },
       },
       ultimate: {
        name: "EMP",
        description: "Sombra discharges electromagnetic energy in a wide radius, destroying enemy barriers and shields and hacking all opponents caught in the blast.",
        cost: 1400,
        cast_time: 0.35,
        duration: 10,
        damage: "+40%",
        barrier_damage: 10000,
        area_of_effect: 15
       },
    },


    {    
        id: 26,
        name: "Symmetra" ,
        health: 200,
        age: 28,
        affiliation: "Vishkar Corporation",
        role: "Damage",
        nationality: "Indian",
        weapon: {
            name: "Photon Projector",    
            primary_damage: {
                first_phase: 60,
                second_phase: 120,
                third_phase: 180
            },
            secondary_damage: {
                direct: 90,
                splash: 45
            },
            rate_of_fire: 20,
            primary_range: 12,
            reload_time: 1.35,
            ammo: 100,
            projectile_speed: 50
       },
       abilities: {
         ability_one: {
            name: "Sentry Turrent",
            description: "Symmetra launches a small turret that automatically fires speed-reducing blasts at the nearest enemy within range. Up to three turrets can be built on the battlefield at once.",    
            health: 30,
            cast_time: 0.5,
            cooldown: 10,
            range: 10,
            projectile_speed: 20,
            damage: 40,
            move_speed: "-15%"
         },
         ability_two: {
            name: "Teleporter",
            description: "Symmetra places a temporary teleporter exit pad at a distance and connects it to a teleporter entry pad at her current location. Allies (and some of their abilities, such as Junkrat’s RIP-Tire) can travel from the entry pad to the exit pad instantly.",
            health: 200,
            cooldown: 12,
            cast_time: 2,
            duration: 10,
            range: 40,
            area_of_effect: 1.5
         },
       },
       ultimate: {
        name: "Photon Barrier",
        description: "Symmetra deploys a massive energy barrier which prevents ranged attacks and is big enough to cut through the entire map.",
        cost: 1680,
        health: 4000,
        duration: 12,
        range: 25,
       },
    },

    {    
        id: 27,
        name: "Torbjörn" ,
        health: 200,
        armour: 50,
        age: 57,
        affiliation: "Overwatch",
        role: "Damage",
        nationality: "Swedish",
        weapons: {
            weapon_one: {
                name: "Rivet Gun",    
                damage: {
                    primary: 70,
                    secondary: 125
                },
                rate_of_fire: {
                    primary: 1.67,
                    secondary: 1.25
                },
                reload_time: 2,
                ammo: 18,
                projectile_speed: {
                    primary: 70,
                    secondary: 120
                }
            },
            weapon_two: {
                name: "Forge Hammer",
                damage: 55,
                range: 2.5,
                cast_time: 0.35,
                rate_of_fire: 1.2
            }
       },
       abilities: {
         ability_one: {
            name: "Deploy Turrent",
            description: "Torbjörn deploys a self-building turret which automatically tracks and attacks enemies.",    
            health: 250,
            cast_time: 3,
            cooldown: 10,
            range: 40,
            rate_of_fire: 4,
            projectile_speed: 15,
            damage: 56,
         },
         ability_two: {
            name: "Overload",
            description: "Torbjörn gains additional armor as well as improved attack, movement, and reload speed for a brief period.",
            armor_boost: 100,
            rate_of_fire: {
                primary: 0.42,
                secondary: 0.56
            },
            move_speed: "+30%",
            duration: 5,
            cooldown: 10,
         },
       },
       ultimate: {
        name: "Molten Core",
        description: "Torbjörn creates pools of molten slag that deal massive, sustained damage (plus bonus damage to armor), and can prevent enemies from moving through key locations.",
        cost: 2142,
        damage: 160,
        projectile_speed: 40,
        area_of_effect: 2.5,
        cast_time: 0.5,
        duration: 10,
        ammo: 10,
       },
    },

    {
            
        id: 28,
        name: "Tracer" ,
        health: 150,
        
        age: 26,
        affiliation: "Overwatch",
        role: "Damage",
        nationality: "British",
        weapon: {
            name: "Pulse Pistols",
            damage: 10,
            ammo: 40,
            rate_of_fire: 20,
            range: 20,
            reload_time: 1.15
       },
       abilities: {
         ability_one: {
            name: "Blink",
            description: "Tracer zips horizontally through space in the direction she’s moving, and reappears several yards away. She stores up to three charges of the blink ability and generates more every few seconds.",    
            range: 7.5,
            ammo: 3,
            duration: 0.1,
            cooldown: 3,
         },
         ability_two: {
            name: "Recall",
            description: "Tracer bounds backward in time, returning her health, ammo and position on the map to precisely where they were a few seconds before.",
            duration: 1.25,
            cooldown: 12,
            rewind_moment: -3,
         },
       },
       ultimate: {
        name: "Pulse Bomb",
        description: "Tracer lobs a large bomb that adheres to any surface or unfortunate opponent it lands on. After a brief delay, the bomb explodes, dealing high damage to all enemies within its blast radius.",
        cost: 1260,
        damage: 350,
        projectile_speed: 15,
        area_of_effect: 5,
        cast_time: 0.15,
       },
    },

    {
            
        id: 29,
        name: "Widowmaker" ,
        health: 200,
        
        age: 33,
        affiliation: "Talon",
        role: "Damage",
        nationality: "French",
        weapon: {
            name: "Widow's Kiss",
            damage: {
                primary: 120,
                secondary: 13
            },
            ammo: 35,
            rate_of_fire: {
                primary: .67,
                secondary: 10
            },
            range: {
                primary: 100,
                secondary: 40
            },
            reload_time: 1.55
       },
       abilities: {
         ability_one: {
            name: "Grappling Hook",
            description: "Widowmaker launches a grappling hook towards the location she’s aiming at – when the hook connects with a scalable surface, she’s quickly drawn towards it, allowing her to expand her view of the battlefield and evade or flank targets.",    
            range: 20,
            cooldown: 12,
            move_speed: 20
         },
         ability_two: {
            name: "Venom Mine",
            description: "Widowmaker adheres a swiftly-arming venom mine to nearly any surface. When a target wanders within range of the mine’s motion trigger, it explodes, delivering poison gas to any enemies in the vicinity.",
            duration: 5,
            health: 1,
            damage: 15,
            cooldown: 15,
            projectile_speed: 20,
            area_of_effect: 3,
         },
       },
       ultimate: {
        name: "Infra-Sight",
        description: "Widowmaker’s recon visor allows her to see the heat signatures of her targets through walls and objects for a moderate amount of time. This enhanced vision is shared with her allies.",
        cost: 1540,
        duration: 15,
        cast_time: 0.5
       },
    },

    {
            
        id: 30,
        name: "Winston" ,
        health: 350,
        armour: 200,
        age: 29,
        affiliation: "Overwatch",
        role: "Tank",
        nationality: "Ape",
        weapon: {
            name: "Tesla Cannon",
            damage: {
                primary: 60,
                secondary: 50
            },
            ammo: 100,
            range: {
                primary: 8,
                secondary: 30
            },
            reload_time: 1.7,
       },
       abilities: {
         ability_one: {
            name: "Jump Pack",
            description: "Assisted by his energy pack, Winston lunges through the air, dealing significant damage and staggering nearby enemies when he lands.",    
            range: 22,
            cooldown: 6,
            move_speed: 30,
            area_of_effect: 5,
            damage: {
                jump: 1,
                landing: 50
            }
         },
         ability_two: {
            name: "Barrier Projector",
            description: "Winston’s barrier projector extends a bubble-shaped field that absorbs damage until it's destroyed. Allies protected by the barrier can return fire from within it.",
            duration: 8,
            health: 700,
            cooldown: 12,
            area_of_effect: 5,
         },
       },
       ultimate: {
        name: "Primal Rage",
        description: "Winston embraces his animal nature, significantly boosting his health and making him very difficult to kill, strengthening his melee attack, and allowing him to use his Jump Pack ability more frequently. While raging, Winston can only make melee and Jump Pack attacks.",
        cost: 1540,
        duration: 10,
        health: 850,
        armor: 150,
        move_speed: "+30%",
        rate_of_fire: 1.5,
        range: 4,
        damage: 40
       },
    },

    {
            
        id: 31,
        name: "Wrecking Ball" ,
        health: 550,
        armour: 150,
        age: 14,
        affiliation: "Luncheng Interstellar",
        role: "Tank",
        nationality: "Hampter",
        weapon: {
            name: "Quad Cannons",
            damage: 5,
            range: 25,
            rate_of_fire: 25,
            ammo: 80,
            reload_time: 2.1
       },
       abilities: {
         ability_one: {
            name: "Grappling Claw",
            description: "Wrecking Ball launches a grappling claw, enabling him to anchor to an area and swing from it. If he strikes an enemy with a powered-up swing, they’re damaged and knocked back.",    
            range: 23,
            cooldown: 5,
            move_speed: "+100%",
            damage: 50,
            duration: 6
         },
         ability_two: {
            name: "Barrier Roll",
            description: "Wrecking Ball transforms into a ball, increasing his maximum movement speed.",
            move_speed: 10,
         },
         ability_three: {
            name: "Adaptive Shield",
            description: "Wrecking Ball’s temporary personal shields absorb damage, providing stronger defenses if more opponents are nearby.",
            min_shield: 100,
            max_shield: 600,
            duration: 9,
            cooldown: 15,
            area_of_effect: 10
         },
         ability_four: {
            name: "Piledriver",
            description: "Wrecking Ball slams onto the ground below, damaging enemies and launching them upward.",
            damage: 100,
            move_speed: 98,
            cooldown: 10,
            area_of_efffect: 8,
         }
       },
       ultimate: {
        name: "Minefield",
        description: "Wrecking Ball deploys a field of long-lasting proximity mines which explode on contact with enemies.",
        cost: 1540,
        duration: 20,
        damage: 120,
        area_of_effect: 1.5,
        projectile_speed: 12,
        health: 50,
        cast_time: 1.6
       },
    },

    {
            
        id: 32,
        name: "Zarya" ,
        health: 250,
        shield: 225,
        age: 28,
        affiliation: "Overwatch",
        role: "Tank",
        nationality: "Russian",
        weapon: {
            name: "Particle Cannon",
            min_damage: {
                primary: 75,
                secondary: 47
            },
            max_damage: {
                primary: 170,
                secondary: 47.5
            },
            ammo: 100,
            rate_of_fire: {
                primary: 20,
                secondary: 1
            },
            range: {
                primary: 15,
            },
            reload_time: 1.5,
            projectile_speed: 25,
            area_of_effect: 2.5
       },
       abilities: {
         ability_one: {
            name: "Particle Barrier",
            description: "The Particle Cannon can emit a personal barrier that shields Zarya against incoming attacks, redirecting their energy to enhance her weapon’s damage and the width of its beam.",    
            health: 200,
            cooldown: 10,
            duration: 2.5,
            area_of_effect: 1.5,
         },
         ability_two: {
            name: "Projected Barrier",
            description: "Zarya surrounds one of her teammates with an energy barrier that simultaneously absorbs fire and boosts the power of her Particle Cannon.",
            duration: 2.5,
            area_of_effect: 1.5,
            cooldown: 8,
            range: 30,
            health: 200
         },
       },
       ultimate: {
        name: "Graviton Surge",
        description: "Zarya launches a gravity bomb that draws in enemy combatants and deals damage while they’re trapped.",
        cost: 2100,
        duration: 4,
        projectile_speed: 25,
        damage: 23,
        area_of_effect: 6
       },
    },

    {
            
        id: 33,
        name: "Zenyatta" ,
        health: 50,
        armour: 150,
        age: 20,
        affiliation: "Shambali",
        role: "Support",
        nationality: "Omnic",
        primary: {
            name: "Kick",
            description: "Zenyatta's quick melee does more damage and knockback"
        },
        weapon: {
            name: "Orb of Destruction",
            damage: 48,
            ammo: 20,
            rate_of_fire: {
                primary: 2.5,
                secondary: 9
            },
            reload_time: 1.5,
            projectile_speed: 90,
       },
       abilities: {
         ability_one: {
            name: "Orb of Harmony",
            description: "Zenyatta casts an orb over the shoulder of a targeted ally. So long as Zenyatta maintains line of sight, the orb slowly restores health to his ally. Only one ally can receive the orb's benefit at a time.",    
            healing: 20,
            range: 40,
            ammo: 1,
            duration: 3,
            projectile_speed: 90,
         },
         ability_two: {
            name: "Orb of Discord",
            description: "Attaching the orb of discord to an opponent amplifies the amount of damage they receive for as long as Zenyatta maintains line of sight. Only one opponent can suffer the orb's effects at a time.",
            duration: 2,
            range: 40,
            projectile_speed: 90,
            ammo: 1,
            damage_boost: "+25%"
         },
       },
       ultimate: {
        name: "Transcendece",
        description: "Zenyatta enters a state of heightened existence for a short period of time. While transcendent, Zenyatta cannot use abilities or weapons, but is immune to damage and automatically restores his health and that of nearby allies.",
        cost: 2310,
        duration: 6,
        move_speed: 11,
        area_of_effect: 10,
        healing: 300
       },
    },


    {
            
        id: 34,
        name: "Junker Queen" ,
        health: 425,
        affiliation: "Junkers",
        role: "Tank",
        nationality: "Austrailian",
        passive: {
            name: "Adrenaline Rush",
            description: "Heal from all damage over time dealt by wounds"
        },
        weapon: {
            name: "Scattergun",
            min_damage: 80,
            ammo: 6,
       },
       abilities: {
         ability_one: {
            name: "Jagged Blade",
            description: "Passive: Quick Melee wounds enemies, dealing damage over time Active: Throw your blade. Can re-activate to return it",    
            damage: {
                impact: 80,
                wound: 15
            },
            healing: 15,
            cooldown: 6,
         },
         ability_two: {
            name: "Commanding Shout",
            description: "Increase health by 200 and nearby allies health by 100. Increase movement speed by 30%",
            duration: 5,
            area_of_effect: 15, 
            cooldown: 11,
            move_speed: "+30%",
            healing: {
                self: 200,
                team: 100
            }
         },
         ability_three: {
            name: "Carnage",
            description: "Swing your axe to wound all enemies in front of you dealing damage over time",
            damage: {
                impact: 90,
                wound: 40
            },
            healing: 40,
            range: 5,
            cooldown: 8
         }
       },
       ultimate: {
        name: "Rampage",
        description: "Charge foward. Wound enemies, dealing damage over time and preventing them from being healed",
        cost: 0,
        healing: 100,
        damage: 100,
        area_of_effect: 5,
       },
    },

    {
            
        id: 35,
        name: "Sojorun" ,
        health: 200,
        affiliation: "Overwatch",
        role: "Damage",
        nationality: "Canadian",
        weapon: {
            name: "Railgun",
            damage: {
                primary: 9,
                secondary: 130,
            },
            ammo: 45,
            rate_of_fire: 14,
       },
       abilities: {
         ability_one: {
            name: "Power Slide",
            description: "Ground slide that can cancel into a high jump",    
            cooldown: 6,
         },
         ability_two: {
            name: "Disruptor Shot",
            description: "Launch an energy shot that slows and deals damage to enemies within it.",
            damage: 210,
            area_of_effect: 5, 
            cooldown: 15,
            range: 30
         },
       },
       ultimate: {
        name: "Overclock",
        description: "Railgun energy auto-charges for a short duration and charged shots pierce enemies.",
        cost: 2100,
        duration: 9
       },
    },
]



export default (req:NextApiRequest, res:NextApiResponse) => {
    res.statusCode = 200;
    const currentId:number = Number(req.query.hero_id) - 1
    const currentHero = heroes[currentId]
    
    res.json({ currentHero });
