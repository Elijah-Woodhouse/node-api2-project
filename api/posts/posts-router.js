// implement your posts router here

const express = require("express");

const Post = require("./posts-model.js");

const router = express.Router();

router.get("/", (req, res) => {
    Post.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error retrieving posts",
            });
        });
    });

    router.get("/:id", (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                if (post) {
                    res.status(200).json(post);
                } else {
                    res.status(404).json({ message: "Does not exist"})
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    message: "Error retrieving the adopter",
                });
            });
    });

    router.post("/", async (req, res) => {
        const { title, contents } = req.body;
        if (!title || !contents){
            res.status(400).json({
                message: "Error adding post. Provide title and content."
            })
        } else {
            Post.insert({title, contents})
                .then(({ id }) => {
                    return Post.findById(id)
                })
                .then(post => {
                    res.status(201).json(post)
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        }
    })

module.exports = router;
