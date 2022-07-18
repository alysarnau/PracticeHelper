/////////////////////////////////
// This file runs on `npm run seed`
/////////////////////////////////

/////////////////////////////////
// import dependencies
/////////////////////////////////
const mongoose = require('./connection')
const Practice = require('./practice')

/////////////////////////////////
// seed code
/////////////////////////////////
const db = mongoose.connection
db.on('open', () => {
    // need array of starter fruits
    const startPractices = [
    {
        date: '2022-07-11',
        instrument: 'Piano',
        owner: '62cdc0e8d37e628d28938022',
        entries: [
        {
            piece: 'Piece One',
            composer: 'Bartok',
            minutes: 15,
            note: '80 bpm',
        }
        ],
    },
    {
        date: '2022-07-13',
        instrument: 'Piano',
        owner: '62cdc0e8d37e628d28938022',
        entries: [
        {
            piece: 'Gnossiene #1',
            composer: 'Satie',
            minutes: 15,
            note: 'Worked on expressiveness.',
        },
        {
            piece: 'Little One',
            composer: 'Bartok',
            minutes: 21,
            note: 'More bartok',
        },
        {
            piece: 'Prelude #4',
            composer: 'Chopin',
            minutes: 20,
            note: 'Worked on expressiveness bars 16-24',
        }
        ],
    },
    {
        date: '2022-07-05',
        instrument: 'Trombone',
        owner: '62cdc0e8d37e628d28938022',
        entries: [
        {
            piece: 'Stars and Stripes Forever',
            composer: 'Strauss',
            minutes: 20,
            note: 'Needs more forte!',
        },
        {
            piece: 'Scales - Major',
            composer: 'N/A',
            minutes: 15,
            note: '160 bpm',
        }
        ],
    },
    {
        date: '2022-07-16',
        instrument: 'Harpsicord',
        owner: '62cdc0e8d37e628d28938022',
        entries: [
        {
            piece: "Devil's Trill Sonata, Movement 1",
            composer: 'Tartini',
            minutes: 25,
            note: 'Needs more spookiness.',
        }
        ],
    },
    {
        date: '2022-07-11',
        instrument: 'Pianoforte',
        owner: '62cdc0e8d37e628d28938022',
        entries: [
        {
            piece: "The Well-Tempered Klavier, #2",
            composer: 'Bach',
            minutes: 20,
            note: 'Very fugue-y.',
        }
        ],
        },
    {
        date: '2022-07-07',
        instrument: 'Piccolo',
        owner: '62cdc0e8d37e628d28938022',
        entries: [
            {
            piece: 'Stars and Stripes Forever',
            composer: 'Strauss',
            minutes: 25,
            note: 'Working on the piccolo solo page 2.',
            }
        ],
    },
    {
        date: '2022-07-11',
        instrument: 'Piano',
        owner: '62cdc0e8d37e628d28938022',
        entries: [
            {
            piece: 'Toccata and Fugue',
            composer: 'Bach',
            minutes: 25,
            note: 'Working on left/right hand tradeoff.',
            }
        ],
    },
    {
        date: '2022-07-10',
        instrument: 'Kazoo',
        owner: '62cdc0e8d37e628d28938022',
        entries: [
            {
            piece: 'Rem Lazar',
            composer: 'N/A',
            minutes: 20,
            note: 'Finally nailing kazoo solo!',
            }
        ],
    },
    {
        date: '2022-07-06',
        instrument: 'Harmonica',
        owner: '62cdc0e8d37e628d28938022',
        entries: [
            {
            piece: 'Clementine',
            composer: 'Folk Song',
            minutes: 20,
            note: 'Worked out trills during second verse.',
            }
        ],
    },
    {
        date: '2022-07-04',
        instrument: 'Piano',
        owner: '62cdc0e8d37e628d28938022',
        entries: [
            {
            piece: 'Scary Monsters and Nice Sprites',
            composer: 'Skrillex',
            minutes: 120,
            note: 'Managed to turn this dubstep classic into a real bop.',
            }
        ],
    }
    
]
    
    // when we seed data, we usually clear out the db first
    // then create that data 
    // whether successful OR not, we want to close our db connection
    Practice.deleteMany({})
    // then we create the data
    .then(deletedPractices => {
        console.log('this is what remove returns', deletedPractices)
        Practice.create(startPractices)
        .then(data => {
            console.log('the new practices ', data)
            db.close()
        })
        .catch(err => {
            console.log('error:', err)
            db.close()
        })
    })
    // and return error if failed
    .catch(err => {
        console.log('error:', err)
        db.close()
    })
})