const express = require('express')
const app = express()
const port = 3000

// Project: Personal Task Manager
// Objective: Build a task management API for creating, updating, and managing tasks.
// Tasks:
// CRUD operations for tasks (POST, GET, PUT, DELETE).
// Validate task input data (e.g., title and status fields) using middleware.
// Persist tasks in a tasks.json file.

let data = [
    { "name": "Arjun Tripathi", "course": "MCA", "roll_no": "14", "id": 1},
    { "name": "Rahul Durgapal", "course": "MCA", "roll_no": "36", "id": 2 },
    { "name": "Aman Yadav", "course": "MCA", "roll_no": "08", "id": 3}
];

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', function (req, res) {
    res.status(200).json(data);
});

app.post('/', function (req, res) {
    let items = data.map(item => item.id);
    let newId = items.length > 0 ? Math.max.apply(Math, items) + 1 : 1;
    let newItem = {
        id: newId,
        name: req.body.name,
        course: req.body.course,
        roll_no: req.body.roll_no
    }
    data.push(newItem);
    res.status(201).json({
        'message': "successfully created"
    });
});

app.put('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        let updateData = {
            id: found.id,
            name: req.body.name,
            course: req.body.course,
            roll_no: req.body.roll_no
        };

        let targetIndex = data.indexOf(found);

        data.splice(targetIndex, 1, updateData);

        res.status(201).json({ 'message': "data updated" });
    } else {
        res.status(404).json({
            'message': 'unable to insert data because data inserted not matched'
        });
    }
});

app.delete('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        let targetIndex = data.indexOf(found);
        data.splice(targetIndex, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})