const express = require('express');
const router = express.Router();

//Item model
const Item = require('../../models/Item');

//@route GET api/items
//@desc get all items
//@access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

// @route   GET api/items/:id
// @desc    Get items by id
// @access  Public
router.get('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(404).json({
            nopostfound: 'No Post Found With That Id'
        }));
});

//@route POST api/items
//@desc create item
//@access Public
router.post('/', (req, res) => {
    const newItem = new Item ({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

//@route POST api/items/:id
//@desc update
//@access Public
router.post('/:id', (req, res) => {
    // const updatedItem = {};
    // if(req.body.id){
    //     req.body.id = updatedItem.id
    // }
    // if(req.body.name){
    //     req.body.name = updatedItem.name
    // }
    // if(req.body.date){
    //     req.body.date = updatedItem.date
    // }

   
                Item.findByIdAndUpdate(
                    req.params.id
                , req.body
                , {
                    new: true
                }).then(item => res.json(item))
                .catch(err => console.log(err));   
        
    });

//@route DELETE api/items/:id
//@desc delete item
//@access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});


module.exports = router;