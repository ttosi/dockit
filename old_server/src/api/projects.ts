import express, { Request, Response } from 'express'
const router = express.Router()

const stages = [
  { "id": 1, "name": "New Idea" },
  { "id": 2, "name": "Thinking About it" },
  { "id": 3, "name": "Planning it" },
  { "id": 4, "name": "Working on it" },
  { "id": 5, "name": "Done with it" },
  { "id": 6, "name": "Saving for later" }
]

router.get('/', (req: Request, res: Response) => {
  res.json([
    {
      "id": 1,
      "name": "SLA Curing Box",
      "description": "Multi stage curing box for SLA prints",
      "stage": stages[0],
      "tasks": [
        { name: "print enclosure frame parts", completed: false },
        { name: "build enclosure", completed: false },
        { name: "test misting nozzles", completed: false }
      ],
      "parts": [
        { name: "12x12 acrylic sheets", quantity: 8, cost: 12.45, purchased: false, source: "Home Depot" },
        { name: "Misting nozzles", quantity: 1, cost: 9.98, purchased: true, source: "Amazon" },
        { name: "Pumps", quantity: 2, cost: 13.87, purchased: true, source: "Amazon" },
      ],
      "created": new Date(),
      "completed": ""
    },
    {
      "id": 2,
      "name": "Octopi Macro-pad",
      "description": "8-key macro keypad for commonly used commands in FDM printing. Interfaces with Octopi API",
      "stage": stages[3],
      "tasks": [],
      "parts": [],
      "created": new Date(),
      "completed": ""
    },
    {
      "id": 3,
      "name": "Smart Mirror",
      "description": "A smart mirror using Magic Mirror&sup2;",
      "stage": stages[4],
      "tasks": [],
      "parts": [],
      "created": new Date(),
      "completed": ""
    },
    {
      "id": 4,
      "name": "Health Logger",
      "description": "Android app to track workouts, runs and bodyweight",
      "stage": stages[4],
      "tasks": [],
      "parts": [
      ],
      "created": new Date(),
      "completed": ""
    },
    {
      "id": 5,
      "name": "Dockit",
      "description": "Web app to track projects",
      "stage": stages[2],
      "tasks": [],
      "parts": [],
      "created": new Date(),
      "completed": ""
    },
    {
      "id": 5,
      "name": "Spray Booth",
      "description": "A booth for exhausting and containing airbrushing paints",
      "stage": stages[1],
      "tasks": [],
      "parts": [],
      "created": new Date(),
      "completed": ""
    }
  ])
})

export default router