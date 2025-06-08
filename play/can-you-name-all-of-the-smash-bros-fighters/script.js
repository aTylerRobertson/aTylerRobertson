// SUPER SMASH BROS
let i = 0;
const guesses = [];
let answers = [];

let startTime = Date.now();
let endTime = Date.now();

const picture = document.querySelector("#picture");
const submit = document.querySelector("#submit");
const input = document.querySelector("#input");
const current = document.querySelector("#current");
const total = document.querySelector("#total");
const ready = document.querySelector("#ready");
const game = document.querySelector("#game");
const results = document.querySelector("#results");
const start = document.querySelector("#start");

// CHOOSE YOUR CHARACTER
const fighters = [
    {
        name: ["Mario", "Super Mario", "Mario Mario"],
        alt: "A man wearing blue overalls, brown boots, white gloves, and red shirt and cap. He has blue eyes and brown hair, and a bushy brown mustache. His cap has a red letter M printed on the front. He is leaping through the air, fist and foot extended towards the right side of the camera.",
        picture: "./images/mario.webp",
    },
    {
        name: ["Donkey Kong"],
        alt: "An ape with brown hair and bare face, chest, hands, and feet. He is wearing a red tie with the letters DK printed on it. He is smiling to the camera and flexing his arms, as though winding up for a punch.",
        picture: "./images/dk.webp",
    },
    {
        name: ["Link"],
        alt: "A young man wearing a blue tunic, as well as brown pants, gloves, and boots. He has long blonde hair which has been pulled back into a ponytail, but there are still long strands on either side of his face. He is carrying a sword with a large blue hilt, and a shield with the emblem of a red bird beneath three golden triangles. He holds the shield in front of him, and the sword up, about to strike.",
        picture: "./images/link.webp",
    },
    {
        name: ["Samus", "Samus Aran"],
        alt: "A figure in an orange metallic space suit, face obscured by a red helmet with a green visor. The suit has large, spherical shoulder, and their right arm is a shiny blue laser weapon, held at the ready.",
        picture: "./images/samus.webp",
    },
    {
        name: ["Dark Samus"],
        alt: "A figure in a black metallic space suit, face obscured by a helmet with a blue visor. Around the suit are veins and natural-feeling ridges which glow a light blue. Their right arm is a long laser cannon which looks about to fire.",
        picture: "./images/darkSamus.webp",
    },
    {
        name: ["Yoshi", "Yoshisaur Munchakoopas"],
        alt: "A cartoonish green dinosaur with red spines going down the back of its head, and a red shell on its back. It's wearing brown shoes, and smiles as it walks to the right of the camera while waving to us with a four-fingered hand.",
        picture: "./images/yoshi.webp",
    },
    {
        name: ["Kirby"],
        alt: "A spherical pink character, with large, shining eyes and rosy cheeks. It is wearing red shoes, and is waving at something past the camera with short, featureless arms.",
        picture: "./images/kirby.webp",
    },
    {
        name: ["Fox", "Fox McCloud"],
        alt: "An anthropomorphic fox chracter, wearing a silver jacket with a red fox logo, green military trousers, and robotic boots that are silver with red toes. They have a headset that covers one eye with a translucent green screen. They are wielding a laser pistol, and appear to be dashing backwards, away from the camera, between shots.",
        picture: "./images/fox.webp",
    },
    {
        name: ["Pikachu"],
        alt: "A yellow creature with shining eyes and solid red circles on its cheeks. It has two long, pointy ears that stand straight up off the top of its end, and are colored black at their tips. Its tail has a patch of brown at the base, and zig-zags to form the shape of a lightning bolt.",
        picture: "./images/pikachu.webp",
    },
    {
        name: ["Luigi", "Luigi Mario"],
        alt: "A man wearing blue overalls, brown boots, white gloves, and green shirt and cap. He has blue eyes, brown hair, and a waxed black mustache. His cap has a green letter L printed on the front. He is posed looking fearfully away from the camera, arms and legs extended as though he is about to fall backwards.",
        picture: "./images/luigi.webp",
    },
    {
        name: ["Ness"],
        alt: "A young boy with pink skin, black eyes, and brown hair. He is wearing a red cap with a blue brim, a yellow-and-blue striped t-shirt, a brown backpack, blue denim shorts, white tube socks, and red shoes. He is carrying a baseball bat, slung casually over his right shoulder.",
        picture: "./images/ness.webp",
    },
    {
        name: ["Captain Falcon", "Capt Falcon"],
        alt: "A muscular man wearing a form-fitting blue jumpsuit, which accentuates his abs and leg muscles. He has yellow gloves which stretch to his elbows, and metallic yellow boots which connect to yello shin-guards. He has one white shoulder pauldron, a pistol kept in a green holster, and a yellow scarf that flows in the breeze. His bright white eyes narrow under the black visor of his red helmet, upon which is a golden bird emblem. He is posted with his left fist clenched behind him, and right arm loosely outstretched, as though about to do a dramatic punch.",
        picture: "./images/captainFalcon.webp",
    },
    {
        name: ["Jigglypuff"],
        alt: "A spherical pink creature with catlike ears, and a swirl of pink hair in the middle of its forehead. It looks at the camera with large blue eyes, and appears to be rolling on the grown as its small, featureless arms and legs stretch out in front of it.",
        picture: "./images/jigglypuff.webp",
    },
    {
        name: ["Peach", "Princess Peach"],
        alt: "A young woman with pale skin, long blonde hair, and large blue eyes. She is wearing a pink ballgown with a large blue gem right below the collar, which matches her large blue earrings. She is also wearing long white gloves, and a golden crown with red and blue gems. She appears to be twirling away from the camera, while carrying a pink parasol.",
        picture: "./images/peach.webp",
    },
    {
        name: ["Daisy", "Princess Daisy"],
        alt: "A young woman with pale skin, brown hair, and large blue eyes. She is wearing a yellow and orange ballgown, white gloves, and a small golden crown. The dress, crown, and her earrings each have a small blue-green gem. She is jumping in the air, right arm stretch skyward as though celebrating victory.",
        picture: "./images/daisy.webp",
    },
    {
        name: ["Bowser", "Bowser Koopa"],
        alt: "A large reptilian creature with yellow scales and spiky orange hair. It has a large, green turtle shell with many metallic spikes emerging from it. It is wearing spiked black bands around its neck, wrists, and upper arms. It holds a menacing, clawed hand aloft, as though it's about to swipe at the camera.",
        picture: "./images/bowser.webp",
    },
    {
        name: ["Ice Climbers", "Popo & Nana", "Nana & Popo"],
        alt: "Two child with pale skin, brown hair, and large eyes. They each wear thick parkas with fluffy white fringes, though one's outfit is purple and the other's is light pink. They are each wielding large wooden mallets, and the one in the pink outfit is leaping into the air, mallet hoisted up as though about to drive it down on something.",
        picture: "./images/iceClimbers.webp",
    },
    {
        name: ["Sheik"],
        alt: "Man with pale skin and long blonde hair, which is wrapped in a white turban and a long ponytail that ends in a metal spike. What little of his hair does show from under the turban covers one of his dark eyes. He is wearing a skin-tight blue and white outfit, which has a red symbol of a bleeding eye printed on the chest. He has a long white scarf which obscures his face, and black-and-gold metallic plates which act as shin and shoulder guards. He is up on one foot, as though about to leap, preparing something to throw something unseen from his right hand.",
        picture: "./images/sheik.webp",
    },
    {
        name: ["Zelda", "Princess Zelda"],
        alt: "A young woman with pale skin, long pointy ears, and flowing blonde hair. She is wearing a flowing white cape, as well as a white dress with blue accents, underneath a pink tabard adorned with three golden triangles. She is also wearing a thin golden headband with a red gem at the forehead, and matching golden armbands on her forearms. Her hair and clothing flow in the window as she spins away from the camera, arms outstretched in a dancer's pose.",
        picture: "./images/zelda.webp",
    },
    {
        name: ["Dr. Mario", "Dr Mario", "Doctor Mario"],
        alt: "A man with light skin, brown hair, blue eyes, and a thick black mustache. He is wearing a white lab coat, white gloves, a stethoscope around his neck, a head mirror, black trousers, and brown boots. He is stroking his chin in consideration.",
        picture: "./images/drMario.webp",
    },
    {
        name: ["Pichu"],
        alt: "A small, yellow creature with large black eyes and a pink circle on each cheek. Its ears are diamond-shaped, poking straight up from their head, with black on their tips. It has a tuft of black hair at its next, as well as a short, black, blocky tail. It stands atop one of its four rounded legs, smiling wide at something just off-frame.",
        picture: "./images/pichu.webp",
    },
    {
        name: ["Falco", "Falco Lombardi"],
        alt: "An anthropomorphized bird person, whose blue feathers come to a peak on the top of their head. They are wearing a silver jacket with a red fox emblem on the back, brown military trousers which their feathery blue tail protrudes from, and knee-high metallic boots. They have a pistol held in a metallic holster, and a headset that covers one of their eyes with a translucent green display. They are posed with right arm and leg lifted behind them, as though winding up for a leaping kick.",
        picture: "./images/falco.webp",
    },
    {
        name: ["Marth"],
        alt: "A young man with shaggy blue hair, pail skin, and serious eyes. He is wearing a thin golden tiara, medieval-style blue tunic, grey trousers, and tall leather boots with criss-crossing straps. His blue-and-red cape billows in the wind as he brandishes a long, gleaming sword with a leather hilt.",
        picture: "./images/marth.webp",
    },
    {
        name: ["Lucina"],
        alt: "A young woman with light skin, blue eyes, and long blue hair held by a small golden tiara. Her clothing is a dark blue, fashioned after the Victorian style, with a jacket, fingerless gloves, and boots that attach to metallic shin-guards that end above her knees. She has a cape with dark red lining, which catches the wind as she readies her sword, a long, straight, golden blade which takes the same shape as the golden symbol on her shoulder",
        picture: "./images/lucina.webp",
    },
    {
        name: ["Young Link"],
        alt: "A young boy with light skin, blue eyes, pointy ears, and long blonde hair that's parted in the middle. He wears a green tunic fastened with a large leather belt, tall brown leather boots, and a long, green hat that flops over and sways in the wind. He is carrying a short sword with a golden hilt, and a rough wooden shield with a spiralling red symbol painted on its front.",
        picture: "./images/youngLink.webp",
    },
    {
        name: ["Ganondorf", "Ganon"],
        alt: "A tall man with gray-brown skin and spiky red hair. He is wearing ornate, well-fitted armor, painted brown and black with patterns that resemble gears, which protects his chest, shoulders, and upper legs. His shins and forearms are wrapped in a white natural fiber, painted with repeating red and blue rectangles. He has a long red cape which ends in golden fringe.",
        picture: "./images/ganondorf.webp",
    },
    {
        name: ["Mewtwo"],
        alt: "A tall white creature with a long, prehensile, purple tail, which extends out behind it. The tip of its tale is slightly larger than the rest, forming a sort of bulb. It has short horns that extend from the top of its head, and a defined chest. It stands upright on two long legs with powerful thights, and its hands and feet end in three bulbous digits.",
        picture: "./images/mewtwo.webp",
    },
    {
        name: ["Roy"],
        alt: "A young man with light skin and medium-length red hair, parted in the middle. He is wearing a blue headband and light blue armor, which covers his shoulders, chest, and knees. Under the armor he is wearing a blue tunic with white accents, and blue trousers which end at white flares near the feet. He has a medium-length cape with red lining, which is tattered from battle. He is yelling at something off-camera, while holding a large sword with a golden hilt, flipped around in one hand so that it faces away from him.",
        picture: "./images/roy.webp",
    },
    {
        name: ["Chrom"],
        alt: "Man with fair skin and blue hair, dressed in dark blue clothing inspired by the Victorian era, with gold piping and large buttons along the front of his shirt. His tattered cape and boots are both white and blue, with his boots ending in cuffs well above his knees. His chest is criss-crossed with silver straps that hold a large, red sword sheath. He holds his sword, a long, straight blade with a golden guard and red handle, in his right hand. His right arm is fully bare, save for a faded blue tattoo depicting a shape similar to that of his sword.",
        picture: "./images/chrom.webp",
    },
    {
        name: [
            "Mr. Game and Watch",
            "Mr Game and Watch",
            "Mister Game and Watch",
            "Game and Watch",
        ],
        alt: "A cartoonish silhouette of a man, fully black with a white outline. He has a large circular head, and bulbous nose that sticks out to the side. His mouth is open so wide that it forms a hole in the silhouette. His hand are simple circles, and in his right hand he holds a flag with the number 1 written on it, waving it in the air as he stomps his right foot.",
        picture: "./images/mrGameAndWatch.webp",
    },
    {
        name: ["Meta Knight"],
        alt: "A blue, spherical warrior whose yellow eyes are shrouded behind a circular, metallic mask. His hands and feet are covered in similar metal armor, and he is wearing a purple cape with golden edges and a tall, white collar. On his left shoulder is a purple pauldron with gold trim, and a white, stylized letter M printed on it. In his left hand he holds a yellow sword in front of him, which has four spikes coming out of either side of the blade, forming new skewering points.",
        picture: "./images/metaKnight.webp",
    },
    {
        name: ["Pit"],
        alt: "A young boy with fair skin and messy brown hair, which is barely made neater with the addition of a golden laurel wreath. He is wearing a white scarf and toga with red and gold trim, over a black tank top and shorts. He wears brown leather sandals, and atop each sandal is a tall leather cuff with fur lining. Two white wings emerge from his back, ready to take flight. In each hand he holds a curved sword with golden edges and a blue middle, and around his left wrist are two glowing yellow rings.",
        picture: "./images/pit.webp",
    },
    {
        name: ["Dark Pit"],
        alt: "A young man with fair skin, narrow brown eyes, and messy black hair fit with a golden laurel wreath. He is wearing a black scarf, and a black toga with gold trim, fitting loosely over black and gold athletic wear. Dark green wings erupt from his back, twisting behind him. On his wrists are large, black and gold bracelets. He has black leather sandals, and black-and-yellow leather shin guards, which are lined with white fur. He wields a wicked-looking purple and gold rifle which doubles as a staff, with a long black barrel that ends in a golden spike.",
        picture: "./images/darkPit.webp",
    },
    {
        name: ["Zero Suit Samus", "Samus", "Samus Aran"],
        alt: "A slender woman with fair skin and long blonde hair which is drawn back into a ponytail. She wears a skin-tight, full-body, light blue suit with dark blue accents at the knees and sides. Her black metal shoes have yellow underlighting which form a high heel. She is posed as though just turning towards the camera, wielding a gray pistol, ready to fire at something just behind the viewer.",
        picture: "./images/zeroSuitSamus.webp",
    },
    {
        name: ["Wario"],
        alt: "A large man with fair skin, whose head is nearly as big as the rest of his body. He has thick black eyebrows, a rosy nose atop a jagged black mustache. His mouth is fully open in a wide smile, showing his large teeth and tongue, above a large cleft chin. He is wearing a ripped denim vest, black shirt, pink jeans with an orange belt, purple shoes that come to a slight point, yellow fingerless gloves, and a yellow-and-orange pilot's cap with goggles. In the middle of the forehead on the cap is a blue letter W.",
        picture: "./images/wario.webp",
    },
    {
        name: [
            "Snake",
            "Dave",
            "Solid Snake",
            "Iroquois Pliskin",
            "The Man Who Makes the Impossible Possible",
        ],
        alt: "A serious-looking man with fair skin, brown hair styled into a mullet, and close-cut brown facial hair. He is wearing tight-fitting tactical gear which is all bluish-gray with black straps, boots, and gloves. A black headband covers his forehead, and its long ends flap in the wind. At his hip is a black pistol in a square, black holster, and his right hand is raised to his ear as though receiving a message.",
        picture: "./images/snake.webp",
    },
    {
        name: ["Ike"],
        alt: "A serious young man with fair skin and windswept blue hair that is just long enough to hide a black headband. He is wearing medieval-style clothing, including a blue tunic with yellow trim, white trousers, and tall brown boots with steel toes. His hands are covered by metal and leather gauntlets which go up to his elbows, and his red cape is tattered with wear. He is holding a large golden sword with a black hilt in front of him, ready to counter incoming attacks.",
        picture: "./images/ike.webp",
    },
    {
        name: ["Pokemon Trainer", "Pokémon Trainer"],
        alt: "A young man with fair skin and brown hair beneath a red-and-white ballcap. He is wearing a short-sleeve black shirt under a red-and-white vest, blue jeans, and red-and-black sneakers. He has a yellow backpack, and is holding a red-and-white ball in his left hand, ready to throw. Behind him are a blue reptilian creature with a pink flow and green vines growing from its back, a blue turtle-like creature with a yellow underbelly, and a large orange dragon.",
        picture: "./images/pokemonTrainer.webp",
    },
    {
        name: ["Diddy Kong"],
        alt: "A small monkey with brown fur and bare hands, feet, and stomach. He is wearing a red ballcap with the Nintendo logo printed on its front, and a red t-shirt with two yellow stars.",
        picture: "./images/diddyKong.webp",
    },
    {
        name: ["Lucas"],
        alt: "A young boy with large black eyes, fair skin, and blonde hair that's style into an upward swoop. He is wearing a red-and-yellow striped t-shirt, denim shorts, white tube socks, and red-and-yellow sneakers. In his left hand, he is holding onto the tail end of a pink snake, who winds around behind him and to his right, and the boy and snake look at each other in shock.",
        picture: "./images/lucas.webp",
    },
    {
        name: ["Sonic", "Sonic the Hedgehog"],
        alt: "A blue creature with catlike ears, and large spikes jutting backwards from his head and back. He has large green eyes, the whites of which meet in the middle of his small black nose. The lower part of his face, along with his chest and arms, are pink, and his hands are covered by white gloves. He is standing on his hind legs, wearing red-and-white sneakers with large gold buckles on them. One leg is kicking forward in an athletic pose.",
        picture: "./images/sonic.webp",
    },
    {
        name: ["King Dedede"],
        alt: "A large penguin-like creature, wearing a red hat with a white pom-pom and golden trim, a red robe with white fur lining, white-and-gold robes with a wide red-and-yellow band around his large stomach. His large yellow feet jut out from under the rob, and his arms end in large orange gloves. He is carrying a heavy wooden mallet, the face of which is adorned with a yellow star on a pink background. He's looking directly at the camera with wide eyes and a large smile.",
        picture: "./images/kingDedede.webp",
    },
    {
        name: ["Olimar", "Captain Olimar", "Capt. Olimar", "Capt Olimar"],
        alt: "A diminutive man with pointy ears, large nose, and three tufts of brown hair. He is wearing a yellow space suit with a red backpack and a spherical glass helmet, with a light-up antenna coming out of the top. He is pulling a red, plant-like creature out of the dirt, and has similar yellow and blue creatures on either side. Each of the creatures has a different kind of flower blooming from a single tall antenna.",
        picture: "./images/olimar.webp",
    },
    {
        name: ["Lucario"],
        alt: "A tall creature with thick white fur on its chest, short blue fur on its head, arms, legs and tail, and smooth black hands and feet. Its face has a black cross going over its red eyes and up between its ears, and four locks of black hair bounce off the back of its head. Small white spikes have emerged from the center of its chest, and the backs of each of its hands. It is holding its left leg up and arm forward, in a familiar karate pose.",
        picture: "./images/lucario.webp",
    },
    {
        name: ["R.O.B.", "ROB"],
        alt: "A playful robot painted a matte silver. It has a small rectangular head with two round eys, attached to a broad chest with two hinged arms that connect to squared-off hands with black grips. From the torso is a series of blocks that form a sort of spine, leading down to a wide hexagonal base, which has several triangular feet poking out from it for stability. A coiled, purple cable connects the base to the head. It is leaping into the air and posing with arms flexed to its sides in an s-curve, not unlike a pose a human dancer might make.",
        picture: "./images/rob.webp",
    },
    {
        name: ["Toon Link"],
        alt: "A cartoonish young boy with exagerrated proportions. He has fair skin, large eyes with black pupils, and a large head with swooping blonde hair. He is wearing a green cloth hat that ends in a point, a simple green tunic, a wide brown belt with a circular golden buckle, tan trousers and sturdy brown boots to cover his little feet. A gold-and-blue sheath if affixed to his back. He is swinging a wide sword with a large blue hilt, and holding behind him a large shield made of wood and metal.",
        picture: "./images/toonLink.webp",
    },
    {
        name: ["Wolf", "Wolf O'Donnell", "Wolf ODonnell"],
        alt: "An anthropomorphic wolf man, whose fur is all gray save for a patch of white on his snout, forehead, and the tip of his bushy tail. He has a black patch over one eye, and wears a purple leather vest and dark purple trousers, each with pink accents. Matching fingerless gloves show off his clawed hands which he holds out menacingly in front of him. His feet, adorned with metal boots that have artificial claws protruding from the toes, are spread into a fighter's stance.",
        picture: "./images/wolf.webp",
    },
    {
        name: ["Villager", "Animal Crossing", "Animal Crossing Villager"],
        alt: "A young man with cartoonish proportions, fair skin, large eyes and a triangular pink nose. He has brown hair crudely rendered as a jagged line across his forehead. He is wearing a red t-shirt with a blue number 1 printed on it, black shorts, green socks and blue slip-on shoes. He smiles as he holds a net made for catching bugs up over his left shoulder.",
        picture: "./images/villager.webp",
    },
    {
        name: ["Mega Man", "Megaman", "Mega-Man"],
        alt: "A young man with fair skin and large blue eyes. He is wearing a robotic, full-body blue suit and helmet, with the pieces at his hands, feet, and head being slightly darker, larger, and seemingly more protective. His left hand has been turned into a laser cannon, and he holds it in front of him as it charges with a red glow emanating from its tip.",
        picture: "./images/megaMan.webp",
    },
    {
        name: ["Wii Fit Trainer"],
        alt: "A woman with gray hair, gray eyes, and porcelain white skin. He is wearing a slightly cropped blue tank top, with the words 'Wii Fit' printed on the chest in white, and black leggings with a blue waistband. She stretches with left arm extended to her right, right arm holding it in place, as she looks with determination at something off-camera.",
        picture: "./images/wiiFitTrainer.webp",
    },
    {
        name: ["Rosalina and Luma", "Luma and Rosalina", "Rosalina"],
        alt: "A woman with fair skin, blue eyes, and long blonde hair which obscures one eye. She is wearing a silver crown with red and blue gems, and a light blue floor-length dress with white star outlines painted along the hem. She holds a slender wand with a yellow star at its tip, pointed towards her companion, who is herself a yellow star with large black eyes, floating and gesturing towards something off-camera.",
        picture: "./images/rosalinaAndLuma.webp",
    },
    {
        name: ["Little Mac", "Mac"],
        alt: "A determined, muscly young man with tan skin and spiky black hair. He is wearing a black tanktop, bright green athletic shorts, tall black shoes that are laced all the way up, and bright green boxer's gloves. He stands with feet out wide, one arm in front and the other behind, as though protecting his face while winding up for a punch.",
        picture: "./images/littleMac.webp",
    },
    {
        name: ["Greninja"],
        alt: "A cartoonishly anthropomorphized frog-like creature, blue with tan accents. Its head is triangular with fins on the sides and middle, similar to a jet plane. Its long pink tongue wraps around its next and flows behind it as a sort of scarf. It has pearl-like blobs at the knees and elbows, and is leaping into the air as though ready to strike with its webbed hands.",
        picture: "./images/greninja.webp",
    },
    {
        name: ["Mii Fighter", "Mii", "Mii Fighters", "Miis"],
        alt: "Three fighters in various garb, each appear to be cartoonish charicatures of real people. One has a large, laser cannon arm and a yellow futuristic outfit. The next is wearing a red outfit with padding designed for hand-to-hand combat, leg raised and ready to kick. The third wears blue medieval clothing, with bits of armor at the elbows and knees, and holds out a sword ready to swing.",
        picture: "./images/miiFighter.png",
    },
    {
        name: ["Palutena"],
        alt: "A woman with fair skin, blue eyes, and long green hair, lit by a light blue halo and image of wings behind her. She wears a golden laurel wreath crown, a flowing white dress that's fashioned after a Greek toga, with red and gold trim. The dress is held together by a large golden necklace, and a belt with a large red gem, and through its hip-length slit we can see her high-heel sandals and long legs, one of which is covered by a tall white stocking. She is wielding a blue staff that ends in a golden device that appears connected to a floating blue orb, and on her other arm is a large blue shield with a golden edge.",
        picture: "./images/palutena.webp",
    },
    {
        name: ["Pac-Man", "Pac Man", "PacMan"],
        alt: "A spherical, bright yellow man with large black eyes and a wide mouth. He smiles wide, strutting past the camera with long, thin legs that end in large red boots. His thin yellow arms end in orange boxing gloves.",
        picture: "./images/pacMan.webp",
    },
    {
        name: ["Robin"],
        alt: "An androgynous young person with messy white hair. They are wearing black clothing with gold accents, inspired by Victorian-era military garb. Their long jacket billows in the wind, revealing a faded red lining, and their white trousers and black boots. In their left hand they hold a yellow book with a lightning-bolt symbol on it, and in their right hand a jagged silver sword with a golden center.",
        picture: "./images/robin.webp",
    },
    {
        name: ["Shulk"],
        alt: "A young man with lightly tanned skin and messy blond hair. He weared a brown, cable-knit sweater under a hooded red leather vest, his left arm adorned with a leather brace and a loop of small metal canisters. He is wearing a large pair of reddish-brown shorts with silver trim, which open to reveal reddish-brown capri pants, with a multitude of buckles and straps hanging off the knees. He wears steel-tipped red-and-brown boots, with straps that appear to float above the ankle. He holds a large red sword in one hand above his head, which has a large, circular hole just above the handle, and is lined with futuristic blue light.",
        picture: "./images/shulk.webp",
    },
    {
        name: ["Bowser Jr.", "Bowser Jr", "Bowser Junior"],
        alt: "A small turtle-like creature with a green head, tan snout, yellow limbs and underbelly, and a tuft of orange hair pulled into a ponytail on the top of his head. He has a large spiny shell on this back, and his front is covered by a bandana, on which a snarling mouth with sharp teeth has been crudely drawn. He is riding in a bulbous white vessel which has a calm face and large black eyes, and a green propeller on the bottom keeping it aloft.",
        picture: "./images/bowserJr.webp",
    },
    {
        name: ["Duck Hunt"],
        alt: "A hound with brown fur, floppy dark brown ears, and a wagging tongue. On his back is a duck with a pink head, yellow bill, purple back and wings, and a white body. The duck appears to be grabbing the hound with its webbed feet, and is flapping to raise both of them into the air.",
        picture: "./images/duckHunt.webp",
    },
    {
        name: ["Ryu"],
        alt: "A muscly, serious man with light skin and black hair. He is wearing a red headband, red fingerless gloves made for MMA fighting, white karate gi with sleeves torn off, and a black obi belt with golden japanese characters written along one end. He stands with his arms folded sternly in front of him.",
        picture: "./images/ryu.webp",
    },
    {
        name: ["Ken"],
        alt: "A muscly, serious man with shaggy blonde hair. He is wearing a red, sleeveless karate gi, brown fingerless gloves made for MMA fighting, and a black obi belt. He is posed with legs apart, left hand near his face, right arm extended, gesturing to an unseen opponent that they should approach.",
        picture: "./images/ken.webp",
    },
    {
        name: ["Cloud", "Cloud Strife"],
        alt: "A man with fair skin and spiky blonde hair. He wears a black, sleeveless, cable-knit turtleneck with a large metal pauldron on his left shoulder. He has wide-legged black trousers and large black boots. With both of his hands he holds a large sword, the blade of which appears to be two feet wide and as long as the man is tall.",
        picture: "./images/cloud.webp",
    },
    {
        name: ["Corrin"],
        alt: "An androgynous young person with feathered, platinum blonde hair. They are wearing a set of well-fitted silver armor that seems to flex slightly with their movements, and their feet are bare. A blue cape billows behind them. In their right hand they hold a holen sword with jagged edges, which is erupting in pink flame.",
        picture: "./images/corrin.webp",
    },
    {
        name: ["Bayonetta"],
        alt: "A woman with fair skin and black hair. She is wearing eyeglasses, long white gloves, and her shirt appears to be made of her own hair, with silver jewelry covering her chest and woven into the hair in various places. She also wears blue, skin-tight leather trousers which join into her high-heeled shoes. Attached to the heels of her shoes are large blue pistols, which match the pistols she holds in each hand. She is striking a dancer's pose, body facing away from the camera, but smiling face and left arm turned to face us.",
        picture: "./images/bayonetta.webp",
    },
    {
        name: ["Inkling", "Squid Kid", "Inkling Girl"],
        alt: "A small child with light skin, orange eyes, and orange hair that ends in a pair of squid-like tentacles. They are wearing a white t-shirt with odd black text on it, black shorts with an orange stripe, and pink tennis shoes with blue laces. On their back they are wearing a large glass tube, filled with an orange liquid. The tube is attached to a green water gun with an orange tank, which they have pointed away from the camera.",
        picture: "./images/inkling.webp",
    },
    {
        name: ["Ridley"],
        alt: "A purple, winged, skeletal lizard creature. It has a long and narrow head with menacing yellow eyes, its long jaw parted just enough to show a row of spiky teeth and a curving tongue. Out of its back emerge two bat-like wings, which have a thick, pink membrane, and spikes jut out from each joint. Its long tail is segmented like a spine, ending in a large metal spike. It is crouched, ready to leap at the camera, with clawed hands raised in preparation to strike.",
        picture: "./images/ridley.webp",
    },
    {
        name: ["Simon", "Simon Belmont"],
        alt: "A thick, muscular man with fair skin and long blonde hair, which is parted in the middle and held back by a jewelled headband. He wears sleeveless brown leather armor, which ends just below his waist and a wide cloth belt. He has large larger boots with iron toes and fur lining, and two metal rings coiled around his left thigh. On his wrists are wide metal bracers. He is wielding a weapon with a sword's hilt, but instead of a blade there is a long iron chain which ends in a spike mace head, coiled in the air like a whip.",
        picture: "./images/simon.webp",
    },
    {
        name: ["Richter", "Richter Belmont"],
        alt: "A muscular young man with fair skin and brown hair, which is held by a white headband. He is wearing a sleeveless blue tunic with a high collar and buttons along the right side of the breast, over gray trousers and tall brown leather boots. He has simple white cloth wrapping around each wrist. In his right hand he holds a weapon with a sword's hilt, but instead of a blade is a long iron chain ending in a spiked mace head, coiled around his arm like one might hold a whip.",
        picture: "./images/richter.webp",
    },
    {
        name: ["King K. Rool", "King K Rool"],
        alt: "A large anthropomorphized crocodil, with a green scales and a golden underbelly. He wears a tall golden crown, and a large golden bracelent around each wrist. A red cap is tied around his neck and fastened with a blue gem. He is standing upright on his hind legs, and pointing at something off-camera with a clawed hand, as though giving an order.",
        picture: "./images/kingKRool.webp",
    },
    {
        name: ["Isabelle"],
        alt: "A cute anthopomorphized dog girl. She has yellow fur, big floppy ears, and an excess of fur has been pulled up into a ponytail on the top of her head. She wears a green gingham sweatervest over a shortsleeve white buttonup and thin red bow tie, and a blue denim skirt. She is walking on featureless hind legs, small bushy tail behind her, and she smiles at the camera with a wide, blushing grin.",
        picture: "./images/isabelle.webp",
    },
    {
        name: ["Incineroar"],
        alt: "A large, cartoonishly anthropomorphized cat creature, with black-and-red striped fur everywhere except his torso, which is gray fur. He has a large head with a symmetrical back-and-red cross design in his fur, large red eyebrows over yellow eyes with green pupils, and a tiny pink cat nose. His mouth is turned in a snarl which shows several point teeth. He is wearing a large belt like a wrestling champion's belt, which is made up of several balls of flame. He is posted with legs apart, tail twitching behind him, and one arm outstretched to show a clawed hand about to grab at something past the camera.",
        picture: "./images/incineroar.webp",
    },
    {
        name: ["Piranha Plant"],
        alt: "A giant plant in a simple terracotta pot. Its flower, atop a tall green stalk, is a red sphere with white polka-dots and a wide mouth, opened to reveal several sharp teeth and a large tongue. It has two large green leaves near the base, which it is flexing like human arms.",
        picture: "./images/piranhaPlant.webp",
    },
    {
        name: ["Joker", "Ren Amamiya"],
        alt: "A young man with pale skin and messy black hair, hiding his face behind a black and white masquerade mask. He wears a long black leather trenchoat, red gloves, black trousers, and tall dark leather boots with a slight heel. He is poised with one leg up, leaning backwards as though dodging something. In his right hand he holds a long dagger with a slender black hilt.",
        picture: "./images/joker.webp",
    },
    {
        name: ["Hero"],
        alt: "An androgynous young person with light skin, blue eyes, and shoulder-length brown hair, parted in the middle. They wear a purple sleeveless tunic over a grey longsleeve shirt, brown trousers, and green-and-pink moccasin boots. Across their chest is slung a wide leather strap, which fastens to their belt and a green satchel. In their right hand they hold a long straight sowrd with a golden cross-guard that extends outwards like the wings of a bird. In their left hand they hold a shield which has a golden bird design against a blue background.",
        picture: "./images/hero.webp",
    },
    {
        name: [
            "Banjo and Kazooie",
            "Kazooie and Banjo",
            "Banjo Kazooie",
            "Banjo-Kazooie",
            "BanjoKazooie",
        ],
        alt: "A brown bear with a large nose, wearing yellow shorts with a large belt buckle, and a necklace with a single shark's tooth on it. On the bear's back is a blue backpack, out of which pops a red bird, with yellow feathers on its underbelly and the tips of its wings. It appears they are friends.",
        picture: "./images/banjoKazooie.webp",
    },
    {
        name: [
            "Terry",
            "Terry Bogard",
            "The Legendary Wolf",
            "South Town Hero",
        ],
        alt: "A nonchalant man with light skin, blue eyes, a long blonde ponytail, and large muscular arms. He wears a red and white trucker cap with 'Fatal Fury' painted on the front, a red leather vest over a white t-shirt with torn-off sleeves, black fingerless gloves, plain denim blue jeans, and red Converse sneakers. He stands with legs apart, right hand holding the brim of his cap, left hand gesturing with a thumb pointing to the side.",
        picture: "./images/terry.webp",
    },
    {
        name: ["Byleth"],
        alt: "An androgynous person with fair skin and gray-blue hair. They wear a long black cloak which obscures iron armor on their chest and arms, a baggy purple tunic, and purple trousers tucked into tall black boots with a simple silver design on the trim. Around their waist is a leather belt with a dagger placed in a purple sheath, and a golden clasp carved into a kind of religious symbol. In their right hand they hold a large golden sword, the hilt of which spans out like two dragon wings around a circular hole, and the blade is jagged and segmented, lit with an orange flame.",
        picture: "./images/byleth.webp",
    },
    {
        name: ["Min Min"],
        alt: "A young woman with fair skin, large green eyes, and a blonde bob haircut with bangs. She has peach-colored facepaint which matches the color of her beanie, which has a white pom-pom on top. She is wearing a green armored chestplate, pained with red and gold accents to mimic a traditional japanese kimono. Below that is a peach skirt with gold trim, above a part of shorts of the same color, above a part of dark brown leggings that go down to her shins. She is wearing green shoes with white laces, designed for fast footwork like a boxer's. Her arms are coiled springs, each with a unique shape: the right arm is a yellow coil ending in an orange device that spins a pink-and-green disc around rapidly, and the left arm is thick with green scales, ending in a mechanical dragon's head with golden snouth, mouth open to reveal a metal nozzle, pointed past the camera.",
        picture: "./images/minMin.webp",
    },
    {
        name: ["Steve", "Minecraft Steve"],
        alt: "A blocky man with pixellated dark skin, dark brown hair, purple eyes, and a dark goatee. He is wearing a similarly pixellated blue shirt, purple pants, and gray shoes.",
        picture: "./images/steve.webp",
    },
    {
        name: ["Sephiroth"],
        alt: "A man with light skin, dark eyes, and long white hair. He is wearing a long black leather trenchcoat, black leather trousers, black gloves, and black leather shoes. He has silver pauldrons on each shoulder. A single black angel wing protrudes from his back, and extends slightly to his right. In his left hand, he holds a long katana, which is nearly as tall as he is.",
        picture: "./images/sephiroth.webp",
    },
    {
        name: [
            "Pyra and Mythra",
            "Mythra and Pyra",
            "PyraMythra",
            "MythraPyra",
        ],
        alt: "Two young women, each holding a triangular sword, posed back-to-back in friendly partnership. The woman on the left has all read features: red hair, eyes, skin-tight red outfit which exposes her hips, and her sword is red and broken into futuristic segments. The woman on the right has blonde hair, and wears a white top that exposes her shoulders, black leggings, and white boots with minimalist golden wings. Her sword is white and gold, symmestrical along its length. Both women have small glowing accents of light green on their outfits and weapons, as though powered by some internal source",
        picture: "./images/pyraAndMythra.webp",
    },
    {
        name: ["Kazuya", "Mishima", "Kazuya Mishima", "Mishima Kazuya"],
        alt: "A scarred and muscular Japanese man, with black hair combed back to a point, and a glowing red eye. He is shirtless, exposing several scars on his back and arms. He is wearing red fingerless gloves with metal studs, white gi trousers with a gold-and-black flame design on one leg, a gold-and-black obi belt, and red-and-black wrappings on his feed. He has assumed a fighter's stance, awaiting first strike.",
        picture: "./images/kazuya.webp",
    },
    {
        name: ["Sora"],
        alt: "A young man with spiky brown hair, wearing a red shirt under a short-sleeved black-and-white hoodie, large red shorts, white fingerless gloves, and cartoonishly large yellow sneakers. He has a wallet chain where the chain is made up of small metal crowns, and a chain necklace which also has a crown charm hanging from it. In his right hand he holds a large, old fashioned key the size of a sword, which has a large golden handle, hanging from which is a change with a charm shaped like Mickey Mouse's silhouette.",
        picture: "./images/sora.webp",
    },
];

// FUNCTIONS
const guessFighter = () => {
    const guess = input.value.trim();

    // Don't let the player guess nothing
    if (guess.length == 0) return false;

    guesses.push(guess);
    input.value = "";
    window.scrollTo(0, 0);

    i += 1;

    if (i == answers.length) {
        endGame();
    } else {
        picture.src = answers[i].picture;
        picture.alt = answers[i].alt;
        current.innerText = i + 1;
    }
};

const keyboardHandler = (event) => {
    if (event.key === "Enter") {
        guessFighter();
    }
};

const startGame = () => {
    startTime = Date.now();
    answers = fighters
        .map((fighter) => {
            return {
                ...fighter,
                rand: Math.random(),
            };
        })
        .sort((a, b) => {
            return a.rand - b.rand;
        });

    guesses.length = 0;
    i = 0;

    picture.src = answers[i].picture;
    picture.alt = answers[i].alt;

    current.innerText = i + 1;
    total.innerText = answers.length;

    ready.classList.add("hidden");
    game.classList.remove("hidden");
};

const endGame = () => {
    // See how many correct guesses they had
    let totalCorrect = 0;
    for (const [index, guess] of guesses.entries()) {
        const answer = answers[index];
        const cleanedGuess = guess
            .replace(/&/gi, "and")
            .replace(/!|[^\sa-z]/gi, "")
            .toLowerCase();
        const regex = new RegExp(`\\b${cleanedGuess}\\b`);
        // Since a character might have multiple names, let's check all of them
        const wasCorrect =
            answer.name.filter((name) => regex.test(name.toLowerCase()))
                .length > 0;

        console.log(cleanedGuess, answer.name, wasCorrect);

        // Add given answer and correct answer to the page
        const row = document.createElement("div");
        row.classList.add("row");

        const image = document.createElement("div");
        const img = document.createElement("img");
        img.src = answer.picture;
        image.appendChild(img);

        const yourAnswer = document.createElement("div");
        yourAnswer.innerText = guess;

        if (wasCorrect) {
            yourAnswer.classList.add("correct");
            totalCorrect += 1;
        } else {
            yourAnswer.classList.add("incorrect");
        }

        const correctAnswer = document.createElement("div");
        correctAnswer.innerText = answer.name[0];

        row.appendChild(image);
        row.appendChild(yourAnswer);
        row.appendChild(correctAnswer);
        results.appendChild(row);
    }

    // Figure out how much time it took
    endTime = Date.now();
    const timeDiff = Math.abs(startTime - endTime);
    const minutes = Math.floor(timeDiff / 1000 / 60);
    const seconds = Math.floor(timeDiff / 1000) - minutes * 60;

    document.querySelector("#totalCorrect").innerText = totalCorrect;
    document.querySelector("#numberOfFighters").innerText = answers.length;
    document.querySelector("#minutes").innerText = minutes;
    document.querySelector("#seconds").innerText = seconds;

    game.classList.add("hidden");
    results.classList.remove("hidden");
};

start.addEventListener("click", startGame);
submit.addEventListener("click", guessFighter);
input.addEventListener("keyup", keyboardHandler);

// FIGHT!
