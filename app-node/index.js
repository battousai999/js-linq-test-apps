const {Linq} = require('js-linq');

var data = {
    characters: [
        { name: 'Ryker', level: 11, class: 'fighter', race: 'human' },
        { name: 'Drizzt', level: 13, class: 'fighter', race: 'elf' },
        { name: 'Tsukune', level: 9, class: 'rogue', race: 'human' },
        { name: 'Gimli', level: 11, class: 'sorcerer', race: 'dwarf' },
        { name: 'Bash', level: 12, class: 'cleric', race: 'human' }
      ]
};
  
var selectedCharacters = Linq.from(data.characters) 
    .where(function (x) { return x.race === 'human'; })
    .orderBy(function (x) { return x.level; })
    .select(function (x) { return x.name; })
    .toArray();

console.log(selectedCharacters.join(', '));
  
