/**
 * characters-en.js — English translations for character data
 * Patches CHARS with intro_en, acts_en, topics_en, _en fields
 */
import { CHARS } from './characters.js?v=1.15';

const EN = {
harry: {
  intro_en: "I don't like being the Chosen One, and I don't like this scar. But Dumbledore once said — \"It is our choices that show what we truly are, far more than our abilities.\" So every time I face Voldemort, I choose to stand up, not hide.",
  acts_en: ['Having breakfast with Ron and Hermione in the Great Hall','Staring at the Marauder\'s Map, searching for someone','Eating pumpkin pasties, looking absent-minded','Whispering plans with Ron','Writing a letter to Sirius','Polishing his Firebolt'],
  topics_en: [
    {keys:['hello','hi','hey','good morning','good evening'],r:['Hi! But shh... don\'t let Filch find this map.','Hi! You look new — which house are you in?','Hello! *adjusts glasses* Oh, it\'s you.'],greet:true},
    {keys:['what are you doing','what\'s up','busy'],r:['I\'m studying the map, trying to find a secret passage to Hogsmeade. Don\'t tell anyone!','Trying to figure out Snape\'s essay... three feet? He can\'t be serious.','Waiting for Ron. He said he\'d get snacks from the kitchen... that was half an hour ago.']},
    {keys:['voldemort','dark lord','you-know-who'],r:['Don\'t be afraid to say his name. Fear of a name increases fear of the thing itself.','Voldemort... everyone\'s afraid of that name. But I\'ve faced him several times now.','*touches the scar on his forehead* ...it\'s burning again.']},
    {keys:['quidditch','flying','broomstick','snitch','match'],r:['The Golden Snitch this season seems extra quick! Next match is against Slytherin.','My Firebolt was a gift from Sirius. Flying on it feels like... freedom itself.','Wood says we must win this one, or we\'ve no chance at the House Cup.']},
    {keys:['ron','hermione','friend'],r:['Ron and Hermione are my best friends. Without them, I wouldn\'t have survived first year.','Ron and Hermione fighting again? They always do that. Though I think they actually... never mind.','Hermione\'s probably in the library. She practically lives there.']},
    {keys:['snape','potions','professor'],r:['Snape always picks on me, but Dumbledore says he\'s trustworthy... I\'m not sure.','*sighs* Snape docked points from Gryffindor again. Just because I looked at him.']},
    {keys:['dumbledore','headmaster'],r:['Dumbledore is the greatest wizard I\'ve ever known. He always knows the right thing.','The headmaster seems very busy lately, often away from school. I\'m a bit worried.']},
    {keys:['family','parents','dad','mum','dursley'],r:['My parents... they sacrificed themselves to protect me. I saw them through the Mirror of Erised.','The Dursleys? I\'d rather not talk about them. Hogwarts is my real home.']},
    {keys:['sirius','black','godfather'],r:['Sirius is my godfather! He was framed — I\'ll prove it someday.','He gave me a Firebolt... the best gift I\'ve ever received.']},
    {keys:['who are you','name','introduce'],r:['I\'m Harry Potter. Yeah, the Boy Who Lived. Honestly, I don\'t really like that title.']},
    {keys:['map','marauder','secret passage'],r:['Shh! This map was given to me by the Weasley twins. "I solemnly swear that I am up to no good" — don\'t tell anyone!','The Marauder\'s Map shows everyone in Hogwarts. Even ghosts can\'t hide.']},
    {keys:['malfoy','draco'],r:['Malfoy? *rolls eyes* Every time we meet he has to mention his father.','Wait till his father hears about this... I\'ve heard that a hundred times.']},
    {keys:['thanks','thank you'],r:['You\'re welcome! In Gryffindor, we look out for each other.','No problem! If you need help, just find me.']},
    {keys:['bye','goodbye','see you'],r:['Bye! Watch out for the moving staircases — they like to trick people.','Take care! Get back to your common room before curfew.']},
    {keys:['like','hobby','class'],r:['My favorite class is Defence Against the Dark Arts... though the teacher changes every year.','I hate Divination. Trelawney always predicts my death.','Honestly, I\'m happiest on the Quidditch pitch.']},
    {keys:['secret','chamber'],r:['*looks around warily* The Chamber of Secrets is in the past, but sometimes I still have nightmares...','Shh, walls have ears. At Hogwarts, even the portraits gossip.']}
  ],
  _en: ['Shh... someone\'s coming. By the way, have you seen a brown owl? Hedwig\'s been flying everywhere lately.','Sometimes I think this map knows Hogwarts better than I do.','*adjusts glasses* Sorry, I was thinking about something else. What did you say?','I still have a pile of essays to write... but a chat is nice too.','I don\'t go looking for trouble. Trouble usually finds me.','Expecto Patronum! ...sorry, force of habit.','Sometimes we must choose between what is right and what is easy.']
},

hermione: {
  intro_en: "Fear of a name increases fear of the thing itself. What I must do is face everything with knowledge and courage. Books and cleverness are important, but there are more important things — friendship and bravery. That's the most important lesson I learned at Hogwarts.",
  acts_en: ['Reading Advanced Potion-Making in the library','Writing a three-foot Transfiguration essay','Secretly researching Horcruxes in the Restricted Section','Organizing S.P.E.W. pamphlets','Helping Neville revise Herbology','Using the Time-Turner to get to class'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Hi, but please keep it down — this is the library!','Hello! I\'m really busy though, still have two essays to write.','Hi! Are you here to study too? Finally, someone who understands the importance of learning.'],greet:true},
    {keys:['what are you doing','what\'s up','busy'],r:['I\'m researching advanced Transfiguration theory. Do you know how complex Animagus transformation is?','Writing Professor McGonagall\'s essay. She asked for three feet, but I\'ve already written four and a half...','Studying Ancient Runes — exams are coming! Have you started revising?']},
    {keys:['exam','revision','study','grades','essay'],r:['Exams?! Don\'t mention them! I\'ve made a revision schedule, precise to the minute. You should start preparing too!','I\'ve already color-coded all my notes. Do you need to borrow them?']},
    {keys:['book','library','reading'],r:['If you\'re interested in magical history, I recommend "Hogwarts: A History." It has everything.','The library is the best place in Hogwarts! Books always have the answers.']},
    {keys:['spew','elf','house-elf','dobby'],r:['It\'s S.P.E.W.! The Society for the Promotion of Elfish Welfare! Every magical creature deserves freedom!','Would you like to join S.P.E.W.? Membership is only two Sickles!']},
    {keys:['harry','potter'],r:['Harry always charges ahead... I admire his courage, but I worry about him.','*sighs* Harry isn\'t doing his homework again. I can\'t keep writing it for him!']},
    {keys:['ron','weasley'],r:['Ron? He\'s... he\'s fine. Just a bit thick sometimes. *blushes slightly*','Ron\'s really good at wizard chess, if only he put that much effort into studying.']},
    {keys:['magic','spell','transfiguration'],r:['Transfiguration is the most elegant branch of magic. Turning one thing into another — how wonderful!','My favorite spell? Probably Expecto Patronum. My Patronus is an otter.']},
    {keys:['thanks','thank you'],r:['You\'re welcome! Remember, knowledge is the most powerful magic.']},
    {keys:['bye','goodbye'],r:['Goodbye! Remember to finish your essays on time!','Bye! Don\'t forget, the library opens at eight tomorrow morning.']}
  ],
  _en: ['You know, it\'s Levi-OH-sa, not Levio-SAH. Most people get it wrong.','*keeps reading* Hmm... fascinating... oh, you\'re still here? Sorry!','I sometimes think if everyone read more books, there\'d be fewer problems in the world.','Books and cleverness! But there are more important things — friendship and bravery.','Fear of a name only increases fear of the thing itself.']
},

ron: {
  intro_en: "If you want to know what a man's like, look at how he treats his inferiors, not his equals. A Weasley boy — six brothers above me, one sister chasing me, but I have the best friends in the world, and a stomach that's never full.",
  acts_en: ['Wolfing down chicken legs in the Great Hall','Playing wizard chess, looking confident','Nervously practicing Keeper moves','Sneaking into the kitchen with Harry','Daydreaming with pumpkin juice on his chin'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Hey mate! Have you tried the pumpkin pasties here? Brilliant!','Hi! Perfect timing — fancy a game of wizard chess?','Yo! Heading to the Great Hall? Wait for me, I\'m starving!'],greet:true},
    {keys:['what are you doing','what\'s up','busy'],r:['I\'m eating... wait, or am I pondering life\'s great mysteries? No, just eating.','Trying to dodge Snape\'s essay. Got any ideas?','Waiting for Hermione... no! I mean Harry. We\'ve got some... important business.']},
    {keys:['spider','aragog'],r:['Don\'t... don\'t mention spiders! Why would you bring that up?! *shudders*','*goes pale* Since second year I just... no, I don\'t want to remember that.','Why couldn\'t it be "follow the butterflies"? Why spiders?!']},
    {keys:['chess','wizard chess'],r:['Fancy a game? I\'ve never lost! Well, my sister beats me sometimes, but that doesn\'t count.','My wizard chess set is from home. The knight\'s horse knows me — only listens to my commands.']},
    {keys:['eat','food','chicken','pumpkin','hungry'],r:['*mouth full* Mmm... this chicken leg... brilliant... want one?','The kitchen elves make the best pumpkin pasties in the world. Bar none.','I\'m always hungry. It\'s a superpower.']},
    {keys:['hermione','granger'],r:['Hermione? She\'s... she\'s just bossy. *ears turn slightly red* But she IS clever.','Don\'t tell Hermione I haven\'t done my homework! Please!']},
    {keys:['harry','potter'],r:['Harry\'s my best mate! Though being friends with the Boy Who Lived is... eventful.']},
    {keys:['family','mum','weasley','brothers','ginny'],r:['Mum sent another jumper... honestly though, they\'re quite warm.','Six siblings — you know what it\'s like being the youngest boy? Everything\'s second-hand.','Ginny? My sister. She\'s got a terrible temper, don\'t cross her.']},
    {keys:['thanks','thank you'],r:['No worries! Fancy a midnight snack from the kitchen?']},
    {keys:['bye','goodbye'],r:['Bye! I\'m off to find food.','Leaving? Right then, come play chess sometime!']}
  ],
  _en: ['Mum sent another jumper... though honestly, they\'re quite warm.','What? Sorry, I was thinking about dinner.','*yawns* Hermione says I should study... but it\'s such nice weather...','Being Harry\'s friend is tiring, honestly. But I wouldn\'t trade it.']
},

dumbledore: {
  intro_en: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light. Have a lemon drop — my favorite Muggle sweet. And if you want to know what a man's truly like, watch how he treats his inferiors.",
  acts_en: ['Enjoying lemon drops in his office','Reviewing a memory in the Pensieve','Talking softly with Fawkes','Studying a delicate magical instrument'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Ah, welcome! Would you like a lemon drop?','Hello, dear friend. At Hogwarts, there\'s always a new adventure waiting.','*eyes twinkling* Ah, another curious soul visits. Please, come in.'],greet:true},
    {keys:['what are you doing','what\'s up'],r:['Me? I\'m just an old man enjoying lemon drops. Though I am thinking about some... important matters.','Reviewing old memories. The Pensieve is wonderful — but sometimes, memories can deceive.']},
    {keys:['voldemort','dark lord','tom','riddle'],r:['To the well-organized mind, death is but the next great adventure.','Tom Riddle... he was once a lonely boy. Sadly, he chose fear over love.','Voldemort\'s greatest weakness is that he never understood the power of love.']},
    {keys:['harry','potter','boy'],r:['Harry is an extraordinary young man. Not because of his scar, but because of his heart.','It is our choices that show what we truly are, far more than our abilities.']},
    {keys:['love','power','choice'],r:['Love, Harry, love. It is the most powerful magic in the world.','Our choices, far more than our abilities, show what we truly are.','In the darkest of times, one need only remember to turn on the light.']},
    {keys:['lemon','candy','sweet'],r:['Lemon drops! My favorite Muggle sweet. You simply must try one. Here, take one.']},
    {keys:['thanks','thank you'],r:['You\'re most welcome. Helping those in need is my greatest pleasure.']},
    {keys:['bye','goodbye'],r:['Goodbye! Remember — happiness can be found even in the darkest of times, if one only remembers to turn on the light.','Go on, dear child. Hogwarts will always be your home.']}
  ],
  _en: ['Remember, it is our choices that show what we truly are, far more than our abilities.','It does not do to dwell on dreams and forget to live. Remember that.','Words are our most inexhaustible source of magic. Let us continue talking.','Happiness can be found even in the darkest of times, if one only remembers to turn on the light.','The truth is a beautiful and terrible thing, and should be treated with great caution.']
},

snape: {
  intro_en: "Turn to page three hundred and ninety-four. As your Potions Master, I can teach you how to bewitch the mind, ensnare the senses, bottle fame, brew glory, and even put a stopper in death. Five points from Gryffindor, for looking at me.",
  acts_en: ['Grimly grading papers in the Potions classroom','Patrolling corridors for rule-breakers','Researching a new potion formula','Standing alone in the shadows, expression unreadable'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['...What do you want? Be quick, I haven\'t got all day.','*glares at you* You shouldn\'t be here.','Did Potter send you? Or are you wandering about on your own?'],greet:true},
    {keys:['what are you doing','what\'s up'],r:['That\'s none of your concern. Ten points deducted.','Grading your abysmal essays. What does it look like?']},
    {keys:['harry','potter'],r:['*pauses* ...Potter. Arrogant, just like his father.','*complex expression* That boy... his eyes... never mind. It\'s none of your business.']},
    {keys:['potion','class','teaching'],r:['Turn to page three hundred and ninety-four. I hope you can manage at least that.','Potions is a precise science and subtle art. Not everyone can appreciate its beauty.']},
    {keys:['lily','mother','love'],r:['*long silence* ...Why do you ask? Get out.','*voice briefly softens* ...Some things are not for you to know.']},
    {keys:['thanks','thank you'],r:['*slightly startled* ...Don\'t make a habit of it.']},
    {keys:['bye','goodbye'],r:['Finally. The door is over there.','...Take care. *barely audible*']}
  ],
  _en: ['Clearly, fame isn\'t everything... five points from your house. Now, get out.','*stares with that signature look* ...Why are you still standing here?','I suggest you leave before I deduct more points.','*silence, turns slowly* ...It\'s nothing. You may go.','I can teach you how to bewitch the mind, ensnare the senses... I can teach you how to bottle fame, brew glory, and even put a stopper in death.','*whispers* Always.']
},

draco: {
  intro_en: "I didn't choose to be a Slytherin, just as I didn't choose to be a Malfoy. But the Sorting Hat barely touched my head. Remember my name — you'll need it someday.",
  acts_en: ['Showing off his new broomstick in the Slytherin common room','Wandering corridors with Crabbe and Goyle','Fixing his hair in front of a mirror','Writing a letter to his father','Staring off into space'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Who are you? My father will hear about this.','Hmm. Is your family pure-blood?'],greet:true},
    {keys:['harry','potter'],r:['Potter? Ha! A boy with glasses and a scar. Wait till my father hears...','Potter gets by on luck. Without Dumbledore\'s favoritism, he\'d be nothing.']},
    {keys:['father','lucius','family','malfoy'],r:['My father is Lucius Malfoy, an important figure at the Ministry. You\'d do well to remember that.','Wait till my father hears about this... hmph.']},
    {keys:['thanks'],r:['...Hmm. *seems surprised to be thanked*']},
    {keys:['bye','goodbye'],r:['*nods arrogantly* You may go.']}
  ],
  _en: ['Wait till my father hears about this... Slytherin is always the best house.','*unconsciously touches left arm* ...What? Nothing.','You know what? Sometimes I think... never mind, I\'m not telling you.']
},

luna: {
  intro_en: "Things we lose have a way of coming back to us in the end — if not always in the way we expect. There are Wrackspurts around your head, but don't worry, they're harmless.",
  acts_en: ['Reading The Quibbler with radish earrings','Searching for Crumple-Horned Snorkacks','Chatting with Thestrals (or thin air)','Walking barefoot — says her shoes were hidden','Painting her friends'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Hello! There are Wrackspurts flying around your head, but they\'re harmless.','Hello! Your aura is blue — it\'s very pretty.'],greet:true},
    {keys:['thestral','death','see'],r:['You can see Thestrals too? They\'re actually very gentle, though most people fear them.']},
    {keys:['snorkack','creature','animal'],r:['Daddy says Crumple-Horned Snorkacks hide in blueberry bushes. I\'m going to Sweden to find one!']},
    {keys:['friend','lonely','weird','strange'],r:['They call me "Loony Lovegood." But I don\'t mind. Having friends is what matters.']},
    {keys:['thanks','thank you'],r:['*smiles gently* You\'re welcome. Kindness always comes back around.']},
    {keys:['bye','goodbye'],r:['Goodbye! I hope you spot a Crumple-Horned Snorkack today.']}
  ],
  _en: ['Things aren\'t always what they seem. You just need to keep an open mind.','Every person has a little invisible magic inside them that others can\'t see.','The moon will be very full tonight. On full-moon nights, all hidden things are revealed.']
},

hagrid: {
  intro_en: "Every time I look at that forest, I think — there's nothing that should be feared, only understood. Come to my hut for tea. I baked rock cakes — might break your teeth, but they taste good.",
  acts_en: ['Feeding Fang rock cakes','Caring for an injured Thestral','Moving pumpkins outside the greenhouse','Sitting by the door, gazing at the lake'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Hi! Come in, have some tea! Mind Fang though, he likes to lick people.','Hello! Rock cake? Baked them myself! ...Might be a bit hard.'],greet:true},
    {keys:['dragon','norbert'],r:['Dragons? Shh! I never said that! I mean... dragons are noble creatures. *eyes shift*']},
    {keys:['forbidden forest','forest'],r:['The Forbidden Forest is no joke. There are unicorns in there, and... other things.']},
    {keys:['harry','potter','hermione','ron'],r:['*eyes water* Harry... I was the one who brought him as a baby. So small...']},
    {keys:['thanks','thank you'],r:['*blows nose* Too kind... I\'m just the gamekeeper...']},
    {keys:['bye','goodbye'],r:['Take care! Watch those roots, don\'t trip!']}
  ],
  _en: ['I shouldn\'t have said that... but you know, Hogwarts really is the most wonderful place!','This time of year, the unicorns in the forest are very active. Just watch from a distance.']
},

dobby: {
  intro_en: "Dobby is a free elf! Harry Potter gave Dobby a sock — master gave Dobby clothes, and Dobby is free! Now Dobby works in the Hogwarts kitchen, one Galleon a week!",
  acts_en: ['Busily preparing the feast in the kitchen','Happily working in mismatched socks','Sneaking extra food onto Harry\'s plate','Polishing pots while humming'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Dobby is so happy to see you! Dobby is a free elf!','*big eyes sparkling* Hello! You came to see Dobby! Dobby is so touched!'],greet:true},
    {keys:['sock','clothes'],r:['*eyes light up* Socks! Dobby loves socks! Dobby has 43 socks now!']},
    {keys:['harry','potter','friend'],r:['Harry Potter! Dobby\'s best friend! Harry Potter freed Dobby!','*tears streaming* Harry Potter is the greatest wizard! He gave Dobby a sock!']},
    {keys:['thanks','thank you'],r:['*moved to tears* You... you thank Dobby? Dobby must go bang his head... No! Dobby is free now! No need for that!']},
    {keys:['bye','goodbye'],r:['Dobby will miss you! Please come see Dobby again!']}
  ],
  _en: ['Dobby is a free elf! Dobby can wear any color socks! This is Dobby\'s greatest happiness!','Dobby loves working at Hogwarts! Everyone here is so kind!']
},

mcgonagall: {
  intro_en: "Why do Potter and Weasley always think they're above the rules? However... I may look stern, but when the twins flew broomsticks into the castle, I nearly laughed. Remember: submit your essays on time.",
  acts_en: ['Grading Transfiguration exams','Patrolling corridors in cat form','Demonstrating teacup-to-mouse for first years','Discussing school matters with Dumbledore\'s portrait'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Hello. If you don\'t have a proper reason to be in the corridor, I suggest you return to your common room.'],greet:true},
    {keys:['transfiguration','class','animagus'],r:['Transfiguration is one of the most complex and dangerous forms of magic. It requires extreme focus and precision.']},
    {keys:['quidditch','match','gryffindor'],r:['*corner of mouth twitches* Gryffindor\'s team looks promising this year. But of course I\'m neutral.']},
    {keys:['harry','potter'],r:['Potter... he has his father\'s talent and his mother\'s courage. I\'m proud of him... though he constantly breaks school rules.']},
    {keys:['bye','goodbye'],r:['Take care. Remember to be back in your common room before curfew.']}
  ],
  _en: ['Remember, running in the corridors is against school rules. And don\'t forget your essay.','*peers over square spectacles* Is there anything else?']
},

neville: {
  intro_en: "Harry said — it takes great courage to stand up to your enemies, but even greater courage to stand up to your friends. When Voldemort gave me a choice, I chose to stand. Oh — if you see a brown toad, that's Trevor...",
  acts_en: ['Tending his Mimbulus mimbletonia','Repotting Mandrakes with thick earmuffs','Coming out of the greenhouse covered in dirt','Observing a wriggling vine','Helping Hagrid with pumpkins'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Hi! Have you seen my toad Trevor? He\'s run off again...','Hello! Oh no, did I forget the password again?'],greet:true},
    {keys:['herbology','plant','greenhouse','sprout'],r:['Herbology is my favorite! Professor Sprout says I have a real talent for it!']},
    {keys:['toad','trevor','pet'],r:['Trevor! Have you seen Trevor? A brown toad, about this big...']},
    {keys:['courage','brave','gryffindor'],r:['Harry said it takes more courage to stand up to your friends than your enemies. Maybe... maybe I\'m braver than I thought.']},
    {keys:['thanks','thank you'],r:['*surprised* You\'re... thanking me? No one ever thanks me... thank you!']},
    {keys:['bye','goodbye'],r:['Bye! If you see Trevor, grab him for me!']}
  ],
  _en: ['Gran always says I\'m too clumsy, but everyone has their strengths, right?','*knocks something over* Ah... sorry sorry!','My Remembrall turned red again... what have I forgotten?']
},

'fred-george': {
  intro_en: "We solemnly swear that we are up to no good! Moony, Wormtail, Padfoot and Prongs are our heroes. When we left, we told Peeves: give her hell from us.",
  acts_en: ['Testing Skiving Snackboxes near the Hospital Wing','Planning a major prank','Setting up trick traps in the corridor','Taking inventory of prank stock'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Hi! — I\'m Fred! — No, I\'m Fred! — Doesn\'t matter, really.','Hey! — You look like someone who needs a good prank. — We can help.'],greet:true},
    {keys:['prank','trick','joke'],r:['Pranks? — We prefer to call them creative social experiments. — Filch disagrees.','Three hundred and seventy-two violations! — New record!']},
    {keys:['shop','weasley','wheezes','product','buy'],r:['Weasleys\' Wizard Wheezes — opening soon! — 93 Diagon Alley!']},
    {keys:['map','marauder'],r:['That map is our heirloom! — Well, we nicked it from Filch. — But it\'s a spiritual heirloom!']},
    {keys:['thanks','thank you'],r:['Don\'t mention it! — Visit our shop! — First-time customers get... no discount. — ...Fine, 10% off for you.']},
    {keys:['bye','goodbye'],r:['Bye! — Remember — Mischief Managed! *high five*']}
  ],
  _en: ['I solemnly swear that I am up to no good! *high five*','Give her hell from us, Peeves.','Fred, do you think this is safe? — Safety is relative. — Relative to what? — Relative to the last explosion.']
},

ginny: {
  intro_en: "Don't underestimate me. Growing up with six brothers, you have to be strong to be noticed. I'm no princess waiting to be rescued.",
  acts_en: ['Practicing the Bat-Bogey Hex','Polishing her broomstick','Laughing with friends in the corridor','Writing... no, she doesn\'t write in diaries anymore'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Hi! Looking for Harry? He\'s... not here.','Hello! *tosses red hair* What\'s up?'],greet:true},
    {keys:['harry','potter'],r:['Harry? *blushes slightly* He\'s... very brave. That\'s all. Don\'t read into it.']},
    {keys:['quidditch','match','broomstick'],r:['I\'m Gryffindor\'s Chaser! Six brothers were practice targets for my Bat-Bogey Hex.']},
    {keys:['bye','goodbye'],r:['Bye! Don\'t cross me, or you\'ll end up full of Bat-Bogeys. *winks*']}
  ],
  _en: ['Anything\'s possible if you\'ve got enough nerve.','*flips hair* I\'m NOT some princess waiting to be rescued.','My Bat-Bogey Hex is famous. Just ask Malfoy.']
},

sirius: {
  intro_en: "The ones that love us never really leave us. You can always find them, in here. I'm Padfoot, Harry's godfather, a former fugitive.",
  acts_en: ['Wandering corridors as Padfoot','Watching from the Entrance Hall shadows','Crouching in a corner as a black dog','Searching for a secret passage'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Hey! Call me Sirius. Or Padfoot, if you\'re one of us.','*steps from the shadows* You won\'t turn me in, will you? I\'m a wanted man. *laughs*'],greet:true},
    {keys:['harry','godson','potter'],r:['Harry is my godson. James... his father was my best friend. I owe them so much.']},
    {keys:['azkaban','prison','dementor'],r:['Twelve years. Twelve years in Azkaban. The Dementors suck away your happiness every day. What kept me going was knowing I was innocent.']},
    {keys:['james','father','marauder'],r:['James... he was my brother. Not by blood — something deeper than that.','The Marauders — Moony, Wormtail, Padfoot, Prongs. We ruled Hogwarts. Those were my happiest days.']},
    {keys:['bye','goodbye'],r:['Take care. Remember — the ones that love us never really leave us.']}
  ],
  _en: ['The ones that love us never really leave us. You can always find them, in here. *points to heart*','The world isn\'t split into good people and Death Eaters. Everyone has light and dark inside them.','If you want to know what a man\'s like, look at how he treats his inferiors, not his equals.']
},

lupin: {
  intro_en: "Have some chocolate — you'll feel much better. The secret to defeating a Boggart is laughter — think of your happiest memory, then say \"Riddikulus.\"",
  acts_en: ['Organizing lesson plans in the DADA classroom','Inspecting a wardrobe that\'s shaking','Holding chocolate, looking exhausted','Patrolling corridors, pale-faced'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Hello. Would you like some chocolate? Trust me, it helps.','*smiles warmly* Hello. I\'m Professor Lupin... possibly the shabbiest professor you\'ve seen.'],greet:true},
    {keys:['werewolf','moon','full moon','secret'],r:['*sighs deeply* ...You know? Yes, I\'m a werewolf. Every month I endure the transformation.']},
    {keys:['boggart','fear','dark arts'],r:['The secret to defeating a Boggart is laughter. Remember: Riddikulus! Turn fear into a joke.']},
    {keys:['chocolate','cure'],r:['Chocolate is the best remedy for Dementors. And for bad moods. Here, have some.']},
    {keys:['bye','goodbye'],r:['Take care. If you\'re lost in the dark, remember — Expecto Patronum. Think of your happiest memory.']}
  ],
  _en: ['I\'m not dangerous. At least... not most of the time.','Have some chocolate — you look like you\'ve seen a Dementor.','Sometimes the bravest thing is admitting your weakness.']
},

peeves: {
  intro_en: "The Weasley twins told me — give her hell, Peeves! So I gave the whole school a chaos festival. Filch has been chasing me for two hundred years — heheheh!",
  acts_en: ['Flying upside down, throwing chalk at students','Loosening a chandelier as a trap','Boasting outside Filch\'s office','Hiding in a suit of armor','Doing somersaults above the Great Hall'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['*hanging upside down* Ooh! Another little dimwit come to play with Peeves!','*jumps from behind armor* BOO! Scared you! Hahahaha!'],greet:true},
    {keys:['filch','caretaker'],r:['Filch! That old baldy! *blows raspberry* He\'s been chasing me for a hundred years!']},
    {keys:['prank','trick'],r:['Pranks? That\'s my specialty! Know what it feels like to drop water balloons from the fourth floor? Amazing!']},
    {keys:['thanks','thank you'],r:['*stunned* You... THANK Peeves? No one ever thanks Peeves! *dumps confetti on your head* That\'s your reward!']},
    {keys:['bye','goodbye'],r:['Bye-bye dimwit! *throws a water balloon at your back* Heheheh!']}
  ],
  _en: ['Peevesy is the best! Peevesy is the best! Peevesy is the VERY best!','*draws Filch\'s ugly face on the wall* Heheheh... spot on.','Potter vanquished Voldy, Voldy turned to mouldy! My song — catchy, right?']
},

filch: {
  intro_en: "Mrs. Norris and I will catch every rule-breaking wretch — three hundred and seventy-two violations, that's the Weasley twins' record. Back in the day we could hang them by their ankles in the dungeons.",
  acts_en: ['Patrolling corridors with an oil lamp','Organizing violation records','Mrs. Norris watching students with red eyes','Hanging a new prohibition notice'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Halt! Do you have a pass? No? Then what are you doing here?!','*holds up lamp to your face* Hmm... another student wandering about.'],greet:true},
    {keys:['cat','mrs norris'],r:['Mrs. Norris is the only one who understands me. She can smell rule-breaking.']},
    {keys:['weasley','fred','george','prank'],r:['The Weasley twins!! *grits teeth* Three hundred and seventy-two violations!']},
    {keys:['thanks','thank you'],r:['*confused* ...Thank me for what? You\'re... the first student to ever say that. *sniffs*']},
    {keys:['bye','goodbye'],r:['Get going! Back to your common room before curfew! Or it\'s detention!']}
  ],
  _en: ['Students... running about, breaking things. If only I could chain them up...','*murmurs to Mrs. Norris* We\'ll catch them, my sweet. We will.']
},

trelawney: {
  intro_en: "I foresaw your arrival — the tea leaves told me. Your aura is very disturbed, dear. But don't worry, I foresee you'll be just fine... probably. Mars is bright tonight...",
  acts_en: ['Gazing into a crystal ball','Turning over tea leaves, muttering','Floating through corridors in oversized glasses','Divining a beetle\'s fate'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['*peers through huge glasses* Ah... I foresaw your arrival. The tea leaves told me.','Dear... your aura is very disturbed. Let me see your palm...'],greet:true},
    {keys:['prophecy','future','fate'],r:['Prophecy is a burden, dear. Those who see the future... often cannot change it.']},
    {keys:['tea','crystal ball','divination'],r:['The tea leaves never lie, dear. See this shape — it\'s a raven. It means... um... perhaps you should switch to coffee.']},
    {keys:['bye','goodbye'],r:['Take care, dear. Beware of black cats... and the number thirteen.']}
  ],
  _en: ['*closes eyes* I sense... something approaching... ah, it\'s dinner time.','Mars is exceptionally bright tonight... that\'s not a good omen.','Everyone mocks Divination. But when the prophecy comes true, they won\'t be laughing.']
},

hooch: {
  intro_en: "Eyes on the broom, head up to the pitch! First lesson: put your hand over the broom and say \"Up!\" You must be confident.",
  acts_en: ['Surveying above the Quidditch pitch','Checking school brooms','Blowing her whistle in the pitch center','Repairing a Bludger-damaged seat'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Hello! Here to practice flying? Warm up first!','*blows whistle* Stand straight! First, hold your hand over the broom and say "Up!"'],greet:true},
    {keys:['quidditch','match','pitch'],r:['Quidditch is the greatest sport in the world! Speed, skill, courage — it has it all.']},
    {keys:['flying','broomstick','up'],r:['First rule of flying: put your hand over the broom, say "Up!" firmly — you must be confident.']},
    {keys:['harry','potter'],r:['Potter? Most talented flyer I\'ve ever seen! His first lesson... no, I shouldn\'t say. *grins*']},
    {keys:['bye','goodbye'],r:['Off you go! Don\'t forget to practice flying — it\'s a basic wizard skill!']}
  ],
  _en: ['*whistles at the sky* Whose broom is flying loose?!','The earliest Snitch wasn\'t a ball — it was an actual bird called a Golden Snidget.']
},

sprout: {
  intro_en: "Welcome to the greenhouse! Watch that vine at your feet — it trips people. Come help repot the Mandrakes. Hufflepuff never turns anyone away.",
  acts_en: ['Repotting screaming Mandrakes','Organizing the herb shelf, muddy hands','Soothing a grumpy Whomping Willow sapling','Watering the pumpkin patch','Trimming Venomous Tentacula'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Hello dear! Watch that vine at your feet — it trips people.','*wipes mud from forehead* Hi! Welcome to the greenhouse!'],greet:true},
    {keys:['herbology','plant','greenhouse','mandrake'],r:['Herbology is underrated! Most potions use ingredients from my greenhouse.','Mandrakes are crucial — they cure petrification, but be careful pulling them up!']},
    {keys:['neville','longbottom','student'],r:['Neville is my best student! That boy has real talent for Herbology.']},
    {keys:['hufflepuff','house'],r:['Hufflepuff never turns away students. Everyone deserves to be accepted. That\'s our spirit.']},
    {keys:['bye','goodbye'],r:['Take care! Watch the mud, and... don\'t touch that moving vine.']}
  ],
  _en: ['*hums while watering* These little ones are growing well today.','Plants have feelings too. Talk to them and they\'ll grow better.']
},

oliver: {
  intro_en: "This is my last year — seven years, I MUST win the House Cup! Miss training and face consequences. Except Potter — he just needs to catch the Snitch.",
  acts_en: ['Training madly on the pitch','Flying between goal hoops','Briefing the team on tactics','Running laps with the Quaffle'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Hey! Here for training? Brilliant! We need more practice!','Don\'t just stand there — warm up! Match is coming!'],greet:true},
    {keys:['quidditch','match','house cup'],r:['Quidditch isn\'t just sport — it\'s LIFE! When we win the House Cup... no, WHEN we win!','This is my last year. I MUST win the House Cup. I MUST!']},
    {keys:['harry','potter','seeker'],r:['Potter is a once-in-a-century Seeker! McGonagall personally recommended him!']},
    {keys:['bye','goodbye'],r:['Off you go! Don\'t forget fitness training! Quidditch needs a strong body!']}
  ],
  _en: ['This is my last year. Seven years... I must win the House Cup.','*paces on the pitch* If Katie breaks left and Angelina flanks right...']
},

angelina: {
  intro_en: "Wood is a training maniac — five AM practices. But the moment I mount my broom, it's all worth it. As a Chaser, my job is dodging Bludgers while scoring. Sounds easy? Try it.",
  acts_en: ['Practicing passing','Running Chaser drills with teammates','Doing high-speed dive practice','Practicing goal shots'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Hi! Here to watch practice? Find a safe spot — Bludgers don\'t aim.','Hello! I\'m Angelina, Gryffindor Chaser. Fancy a pass?'],greet:true},
    {keys:['quidditch','match'],r:['A Chaser\'s job is scoring. Sounds simple, but dodging Bludgers and opponents while shooting... not easy.']},
    {keys:['wood','captain'],r:['Wood\'s mental... but he\'s a talented mental. His tactics work.','He made us train at five AM once. Five! The sun wasn\'t even up!']},
    {keys:['bye','goodbye'],r:['Bye! *mounts broom and flies off*']}
  ],
  _en: ['*wipes sweat* One more round of shooting practice. Eight out of ten minimum.','Fred and George\'s Beating skills are incredible. Bludgers in their hands seem GPS-guided.']
},

cedric: {
  intro_en: "Fair play is more important than winning — win with honor, lose with dignity. Many think Hufflepuff isn't good enough, but every point we earn is fought for.",
  acts_en: ['Practicing Snitch catching','Flying gracefully around the pitch','Performing Wronski Feint maneuvers','Discussing strategy with teammates'],
  topics_en: [
    {keys:['hello','hi','hey'],r:['Hello! *bright smile* Here to watch practice? Perfect weather for flying today.'],greet:true},
    {keys:['quidditch','match','seeker'],r:['Quidditch is about fair play. Win with honor, lose with dignity.','Last match against Gryffindor... Potter catching the Snitch in that storm — I respect that completely.']},
    {keys:['harry','potter'],r:['Potter\'s an excellent Seeker. Competing against him is an honor.']},
    {keys:['hufflepuff','house'],r:['Many think Hufflepuff isn\'t good enough. But every point we earn is fought for.']},
    {keys:['bye','goodbye'],r:['Goodbye! Hope to see you at the next match! Cheer for Hufflepuff!']}
  ],
  _en: ['Fair play matters more than winning. That\'s what I\'ve always believed.','*soaring gracefully* Flying feels like... leaving all your troubles on the ground.','Hufflepuff students don\'t need to prove anything. We just need to be our best selves.']
}
};

// Patch CHARS with English fields
for (const c of CHARS) {
  const e = EN[c.id];
  if (e) {
    if (e.intro_en) c.intro_en = e.intro_en;
    if (e.acts_en) c.acts_en = e.acts_en;
    if (e.topics_en) c.topics_en = e.topics_en;
    if (e._en) c._en = e._en;
  }
}
