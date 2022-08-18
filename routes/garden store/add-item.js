const gardenstoreModel = require('../../model/gardenstore');
const gamesessionModel = require('../../model/gamesession');
const groupModel = require('../../model/group');
const userModel = require('../../model/user');
const addItem = (req, res) => {
    const grpid = req.body.id;
    const itemname = req.body.itemname;
    const quantity = req.body.quantity;
    gardenstoreModel.find({
        grpid: grpid
    }).then((response) => {
        if(itemname === 'seed'){
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed + quantity,
                house: response[0].house,
                smallplant: response[0].smallplant,
                mediumplant: response[0].mediumplant,
                largeplant: response[0].largeplant,
                weedkiller: response[0].weedkiller,
                sodroller: response[0].sodroller,
                tree: response[0].tree,
                bag: response[0].bag,
                flower: response[0].flower
            }).then((rep) => {
                groupModel.find({
                    grpid: grpid
                }).then((rsp1) => {
                    groupModel.updateOne({
                        grpid: grpid
                    }, {
                        _id: rsp1[0]._id,
                        grpdi: grpid,
                        users: rsp1[0].users,
                        currentLevel: rsp1[0].currentLevel,
                        grpid: grpid,
                        admin: rsp1[0].admin,
                        weekGoal: rsp1[0].weekGoal,
                        points:(rsp1[0].points - quantity),
                        stat: rsp1[0].stat,
                        steps: rsp1[0].steps,
                        session: rsp1[0].session
                    }).then((rsp2) => {
                        gamesessionModel.find({
                            grpid: grpid,
                            current_checkpoint: rsp1[0].currentLevel
                        }).then((rsp3) => {
                            gamesessionModel.updateOne({
                                grpid: grpid,
                                current_checkpoint: rsp1[0].currentLevel
                            }, {
                                _id: rsp3[0]._id,
                                grpid: rsp3[0].grpid,
                                week_start_date: rsp3[0].week_start_date,
                                week_goal: rsp3[0].week_goal,
                                total_achieved_steps: rsp3[0].total_achieved_steps,
                                total_points: (rsp3[0].total_points - quantity),
                                individual_contribution: rsp3[0].individual_contribution,
                                current_checkpoint: rsp3[0].current_checkpoint
                            }).then((rsp4) => {
                                res.send('Item added successfully');
                            }).catch((er5) => {
                                res.send(er5);
                            })
                        }).catch((er6) => {
                            res.send(er6);
                        })
                    }).catch((er7) => {
                        res.send(er7);
                    })
                }).catch((er1) => {
                    res.send(er1);
                })
            }).catch((err) => {
                res.send(err);
            })
        }
        else if(itemname === 'house'){
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed,
                house: response[0].house + quantity,
                smallplant: response[0].smallplant,
                mediumplant: response[0].mediumplant,
                largeplant: response[0].largeplant,
                weedkiller: response[0].weedkiller,
                sodroller: response[0].sodroller,
                tree: response[0].tree,
                bag: response[0].bag,
                flower: response[0].flower
            }).then((rep) => {
                groupModel.find({
                    grpid: grpid
                }).then((rsp1) => {
                    groupModel.updateOne({
                        grpid: grpid
                    }, {
                        _id: rsp1[0]._id,
                        grpdi: grpid,
                        users: rsp1[0].users,
                        currentLevel: rsp1[0].currentLevel,
                        grpid: grpid,
                        admin: rsp1[0].admin,
                        weekGoal: rsp1[0].weekGoal,
                        points:(rsp1[0].points - 100*quantity),
                        stat: rsp1[0].stat,
                        steps: rsp1[0].steps,
                        session: rsp1[0].session
                    }).then((rsp2) => {
                        gamesessionModel.find({
                            grpid: grpid,
                            current_checkpoint: rsp1[0].currentLevel
                        }).then((rsp3) => {
                            gamesessionModel.updateOne({
                                grpid: grpid,
                                current_checkpoint: rsp1[0].currentLevel
                            }, {
                                _id: rsp3[0]._id,
                                grpid: rsp3[0].grpid,
                                week_start_date: rsp3[0].week_start_date,
                                week_goal: rsp3[0].week_goal,
                                total_achieved_steps: rsp3[0].total_achieved_steps,
                                total_points: (rsp3[0].total_points - 100*quantity),
                                individual_contribution: rsp3[0].individual_contribution,
                                current_checkpoint: rsp3[0].current_checkpoint
                            }).then((rsp4) => {
                                res.send('Item added successfully');
                            }).catch((er5) => {
                                res.send(er5);
                            })
                        }).catch((er6) => {
                            res.send(er6);
                        })
                    }).catch((er7) => {
                        res.send(er7);
                    })
                }).catch((er1) => {
                    res.send(er1);
                })
            }).catch((err) => {
                res.send(err);
            })
        }
        else if(itemname === 'smallplant'){
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed,
                house: response[0].house,
                smallplant: response[0].smallplant + quantity,
                mediumplant: response[0].mediumplant,
                largeplant: response[0].largeplant,
                weedkiller: response[0].weedkiller,
                sodroller: response[0].sodroller,
                tree: response[0].tree,
                bag: response[0].bag,
                flower: response[0].flower
            }).then((rep) => {
                groupModel.find({
                    grpid: grpid
                }).then((rsp1) => {
                    groupModel.updateOne({
                        grpid: grpid
                    }, {
                        _id: rsp1[0]._id,
                        grpdi: grpid,
                        users: rsp1[0].users,
                        currentLevel: rsp1[0].currentLevel,
                        grpid: grpid,
                        admin: rsp1[0].admin,
                        weekGoal: rsp1[0].weekGoal,
                        points:(rsp1[0].points - 5*quantity),
                        stat: rsp1[0].stat,
                        steps: rsp1[0].steps,
                        session: rsp1[0].session
                    }).then((rsp2) => {
                        gamesessionModel.find({
                            grpid: grpid,
                            current_checkpoint: rsp1[0].currentLevel
                        }).then((rsp3) => {
                            gamesessionModel.updateOne({
                                grpid: grpid,
                                current_checkpoint: rsp1[0].currentLevel
                            }, {
                                _id: rsp3[0]._id,
                                grpid: rsp3[0].grpid,
                                week_start_date: rsp3[0].week_start_date,
                                week_goal: rsp3[0].week_goal,
                                total_achieved_steps: rsp3[0].total_achieved_steps,
                                total_points: (rsp3[0].total_points - 5*quantity),
                                individual_contribution: rsp3[0].individual_contribution,
                                current_checkpoint: rsp3[0].current_checkpoint
                            }).then((rsp4) => {
                                res.send('Item added successfully');
                            }).catch((er5) => {
                                res.send(er5);
                            })
                        }).catch((er6) => {
                            res.send(er6);
                        })
                    }).catch((er7) => {
                        res.send(er7);
                    })
                }).catch((er1) => {
                    res.send(er1);
                })
            }).catch((err) => {
                res.send(err);
            })
        }
        else if(itemname === 'mediumplant'){
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed,
                house: response[0].house,
                smallplant: response[0].smallplant,
                mediumplant: response[0].mediumplant + quantity,
                largeplant: response[0].largeplant,
                weedkiller: response[0].weedkiller,
                sodroller: response[0].sodroller,
                tree: response[0].tree,
                bag: response[0].bag,
                flower: response[0].flower
            }).then((rep) => {
                groupModel.find({
                    grpid: grpid
                }).then((rsp1) => {
                    groupModel.updateOne({
                        grpid: grpid
                    }, {
                        _id: rsp1[0]._id,
                        grpdi: grpid,
                        users: rsp1[0].users,
                        currentLevel: rsp1[0].currentLevel,
                        grpid: grpid,
                        admin: rsp1[0].admin,
                        weekGoal: rsp1[0].weekGoal,
                        points:(rsp1[0].points - 5*quantity),
                        stat: rsp1[0].stat,
                        steps: rsp1[0].steps,
                        session: rsp1[0].session
                    }).then((rsp2) => {
                        gamesessionModel.find({
                            grpid: grpid,
                            current_checkpoint: rsp1[0].currentLevel
                        }).then((rsp3) => {
                            gamesessionModel.updateOne({
                                grpid: grpid,
                                current_checkpoint: rsp1[0].currentLevel
                            }, {
                                _id: rsp3[0]._id,
                                grpid: rsp3[0].grpid,
                                week_start_date: rsp3[0].week_start_date,
                                week_goal: rsp3[0].week_goal,
                                total_achieved_steps: rsp3[0].total_achieved_steps,
                                total_points: (rsp3[0].total_points - 5*quantity),
                                individual_contribution: rsp3[0].individual_contribution,
                                current_checkpoint: rsp3[0].current_checkpoint
                            }).then((rsp4) => {
                                res.send('Item added successfully');
                            }).catch((er5) => {
                                res.send(er5);
                            })
                        }).catch((er6) => {
                            res.send(er6);
                        })
                    }).catch((er7) => {
                        res.send(er7);
                    })
                }).catch((er1) => {
                    res.send(er1);
                })
            }).catch((err) => {
                res.send(err);
            })
        }
        else if(itemname === 'largeplant'){
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed,
                house: response[0].house,
                smallplant: response[0].smallplant,
                mediumplant: response[0].mediumplant,
                largeplant: response[0].largeplant + largeplant,
                weedkiller: response[0].weedkiller,
                sodroller: response[0].sodroller,
                tree: response[0].tree,
                bag: response[0].bag,
                flower: response[0].flower
            }).then((rep) => {
                groupModel.find({
                    grpid: grpid
                }).then((rsp1) => {
                    groupModel.updateOne({
                        grpid: grpid
                    }, {
                        _id: rsp1[0]._id,
                        grpdi: grpid,
                        users: rsp1[0].users,
                        currentLevel: rsp1[0].currentLevel,
                        grpid: grpid,
                        admin: rsp1[0].admin,
                        weekGoal: rsp1[0].weekGoal,
                        points:(rsp1[0].points - 10*quantity),
                        stat: rsp1[0].stat,
                        steps: rsp1[0].steps,
                        session: rsp1[0].session
                    }).then((rsp2) => {
                        gamesessionModel.find({
                            grpid: grpid,
                            current_checkpoint: rsp1[0].currentLevel
                        }).then((rsp3) => {
                            gamesessionModel.updateOne({
                                grpid: grpid,
                                current_checkpoint: rsp1[0].currentLevel
                            }, {
                                _id: rsp3[0]._id,
                                grpid: rsp3[0].grpid,
                                week_start_date: rsp3[0].week_start_date,
                                week_goal: rsp3[0].week_goal,
                                total_achieved_steps: rsp3[0].total_achieved_steps,
                                total_points: (rsp3[0].total_points - 10*quantity),
                                individual_contribution: rsp3[0].individual_contribution,
                                current_checkpoint: rsp3[0].current_checkpoint
                            }).then((rsp4) => {
                                res.send('Item added successfully');
                            }).catch((er5) => {
                                res.send(er5);
                            })
                        }).catch((er6) => {
                            res.send(er6);
                        })
                    }).catch((er7) => {
                        res.send(er7);
                    })
                }).catch((er1) => {
                    res.send(er1);
                })
            }).catch((err) => {
                res.send(err);
            })
        }
        else if(itemname === 'weedkiller'){
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed,
                house: response[0].house,
                smallplant: response[0].smallplant,
                mediumplant: response[0].mediumplant,
                largeplant: response[0].largeplant,
                weedkiller: response[0].weedkiller + quantity,
                sodroller: response[0].sodroller,
                tree: response[0].tree,
                bag: response[0].bag,
                flower: response[0].flower
            }).then((rep) => {
                groupModel.find({
                    grpid: grpid
                }).then((rsp1) => {
                    groupModel.updateOne({
                        grpid: grpid
                    }, {
                        _id: rsp1[0]._id,
                        grpdi: grpid,
                        users: rsp1[0].users,
                        currentLevel: rsp1[0].currentLevel,
                        grpid: grpid,
                        admin: rsp1[0].admin,
                        weekGoal: rsp1[0].weekGoal,
                        points:(rsp1[0].points - 40*quantity),
                        stat: rsp1[0].stat,
                        steps: rsp1[0].steps,
                        session: rsp1[0].session
                    }).then((rsp2) => {
                        gamesessionModel.find({
                            grpid: grpid,
                            current_checkpoint: rsp1[0].currentLevel
                        }).then((rsp3) => {
                            gamesessionModel.updateOne({
                                grpid: grpid,
                                current_checkpoint: rsp1[0].currentLevel
                            }, {
                                _id: rsp3[0]._id,
                                grpid: rsp3[0].grpid,
                                week_start_date: rsp3[0].week_start_date,
                                week_goal: rsp3[0].week_goal,
                                total_achieved_steps: rsp3[0].total_achieved_steps,
                                total_points: (rsp3[0].total_points - 40*quantity),
                                individual_contribution: rsp3[0].individual_contribution,
                                current_checkpoint: rsp3[0].current_checkpoint
                            }).then((rsp4) => {
                                res.send('Item added successfully');
                            }).catch((er5) => {
                                res.send(er5);
                            })
                        }).catch((er6) => {
                            res.send(er6);
                        })
                    }).catch((er7) => {
                        res.send(er7);
                    })
                }).catch((er1) => {
                    res.send(er1);
                })
            }).catch((err) => {
                res.send(err);
            })
        }
        else if(itemname === 'sodroller'){
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed,
                house: response[0].house,
                smallplant: response[0].smallplant,
                mediumplant: response[0].mediumplant,
                largeplant: response[0].largeplant,
                weedkiller: response[0].weedkiller,
                sodroller: response[0].sodroller + quantity,
                tree: response[0].tree,
                bag: response[0].bag,
                flower: response[0].flower
            }).then((rep) => {
                groupModel.find({
                    grpid: grpid
                }).then((rsp1) => {
                    groupModel.updateOne({
                        grpid: grpid
                    }, {
                        _id: rsp1[0]._id,
                        grpdi: grpid,
                        users: rsp1[0].users,
                        currentLevel: rsp1[0].currentLevel,
                        grpid: grpid,
                        admin: rsp1[0].admin,
                        weekGoal: rsp1[0].weekGoal,
                        points:(rsp1[0].points - 20*quantity),
                        stat: rsp1[0].stat,
                        steps: rsp1[0].steps,
                        session: rsp1[0].session
                    }).then((rsp2) => {
                        gamesessionModel.find({
                            grpid: grpid,
                            current_checkpoint: rsp1[0].currentLevel
                        }).then((rsp3) => {
                            gamesessionModel.updateOne({
                                grpid: grpid,
                                current_checkpoint: rsp1[0].currentLevel
                            }, {
                                _id: rsp3[0]._id,
                                grpid: rsp3[0].grpid,
                                week_start_date: rsp3[0].week_start_date,
                                week_goal: rsp3[0].week_goal,
                                total_achieved_steps: rsp3[0].total_achieved_steps,
                                total_points: (rsp3[0].total_points - 20*quantity),
                                individual_contribution: rsp3[0].individual_contribution,
                                current_checkpoint: rsp3[0].current_checkpoint
                            }).then((rsp4) => {
                                res.send('Item added successfully');
                            }).catch((er5) => {
                                res.send(er5);
                            })
                        }).catch((er6) => {
                            res.send(er6);
                        })
                    }).catch((er7) => {
                        res.send(er7);
                    })
                }).catch((er1) => {
                    res.send(er1);
                })
            }).catch((err) => {
                res.send(err);
            })
        }
        else if(itemname === 'tree'){
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed,
                house: response[0].house,
                smallplant: response[0].smallplant,
                mediumplant: response[0].mediumplant,
                largeplant: response[0].largeplant,
                weedkiller: response[0].weedkiller,
                sodroller: response[0].sodroller,
                tree: response[0].tree + quantity,
                bag: response[0].bag,
                flower: response[0].flower
            }).then((rep) => {
                groupModel.find({
                    grpid: grpid
                }).then((rsp1) => {
                    groupModel.updateOne({
                        grpid: grpid
                    }, {
                        _id: rsp1[0]._id,
                        grpdi: grpid,
                        users: rsp1[0].users,
                        currentLevel: rsp1[0].currentLevel,
                        grpid: grpid,
                        admin: rsp1[0].admin,
                        weekGoal: rsp1[0].weekGoal,
                        points:(rsp1[0].points - 50*quantity),
                        stat: rsp1[0].stat,
                        steps: rsp1[0].steps,
                        session: rsp1[0].session
                    }).then((rsp2) => {
                        gamesessionModel.find({
                            grpid: grpid,
                            current_checkpoint: rsp1[0].currentLevel
                        }).then((rsp3) => {
                            gamesessionModel.updateOne({
                                grpid: grpid,
                                current_checkpoint: rsp1[0].currentLevel
                            }, {
                                _id: rsp3[0]._id,
                                grpid: rsp3[0].grpid,
                                week_start_date: rsp3[0].week_start_date,
                                week_goal: rsp3[0].week_goal,
                                total_achieved_steps: rsp3[0].total_achieved_steps,
                                total_points: (rsp3[0].total_points - 50*quantity),
                                individual_contribution: rsp3[0].individual_contribution,
                                current_checkpoint: rsp3[0].current_checkpoint
                            }).then((rsp4) => {
                                res.send('Item added successfully');
                            }).catch((er5) => {
                                res.send(er5);
                            })
                        }).catch((er6) => {
                            res.send(er6);
                        })
                    }).catch((er7) => {
                        res.send(er7);
                    })
                }).catch((er1) => {
                    res.send(er1);
                })
            }).catch((err) => {
                res.send(err);
            })
        }
        else if(itemname === 'bag'){
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed,
                house: response[0].house,
                smallplant: response[0].smallplant,
                mediumplant: response[0].mediumplant,
                largeplant: response[0].largeplant,
                weedkiller: response[0].weedkiller,
                sodroller: response[0].sodroller,
                tree: response[0].tree,
                bag: response[0].bag + quantity,
                flower: response[0].flower
            }).then((rep) => {
                groupModel.find({
                    grpid: grpid
                }).then((rsp1) => {
                    groupModel.updateOne({
                        grpid: grpid
                    }, {
                        _id: rsp1[0]._id,
                        grpdi: grpid,
                        users: rsp1[0].users,
                        currentLevel: rsp1[0].currentLevel,
                        grpid: grpid,
                        admin: rsp1[0].admin,
                        weekGoal: rsp1[0].weekGoal,
                        points:(rsp1[0].points - 40*quantity),
                        stat: rsp1[0].stat,
                        steps: rsp1[0].steps,
                        session: rsp1[0].session
                    }).then((rsp2) => {
                        gamesessionModel.find({
                            grpid: grpid,
                            current_checkpoint: rsp1[0].currentLevel
                        }).then((rsp3) => {
                            gamesessionModel.updateOne({
                                grpid: grpid,
                                current_checkpoint: rsp1[0].currentLevel
                            }, {
                                _id: rsp3[0]._id,
                                grpid: rsp3[0].grpid,
                                week_start_date: rsp3[0].week_start_date,
                                week_goal: rsp3[0].week_goal,
                                total_achieved_steps: rsp3[0].total_achieved_steps,
                                total_points: (rsp3[0].total_points - 40*quantity),
                                individual_contribution: rsp3[0].individual_contribution,
                                current_checkpoint: rsp3[0].current_checkpoint
                            }).then((rsp4) => {
                                res.send('Item added successfully');
                            }).catch((er5) => {
                                res.send(er5);
                            })
                        }).catch((er6) => {
                            res.send(er6);
                        })
                    }).catch((er7) => {
                        res.send(er7);
                    })
                }).catch((er1) => {
                    res.send(er1);
                })
            }).catch((err) => {
                res.send(err);
            })
        }
        else{
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed,
                house: response[0].house,
                smallplant: response[0].smallplant,
                mediumplant: response[0].mediumplant,
                largeplant: response[0].largeplant,
                weedkiller: response[0].weedkiller,
                sodroller: response[0].sodroller,
                tree: response[0].tree,
                bag: response[0].bag,
                flower: response[0].flower + quantity
            }).then((rep) => {
                groupModel.find({
                    grpid: grpid
                }).then((rsp1) => {
                    groupModel.updateOne({
                        grpid: grpid
                    }, {
                        _id: rsp1[0]._id,
                        grpdi: grpid,
                        users: rsp1[0].users,
                        currentLevel: rsp1[0].currentLevel,
                        grpid: grpid,
                        admin: rsp1[0].admin,
                        weekGoal: rsp1[0].weekGoal,
                        points:(rsp1[0].points - 2*quantity),
                        stat: rsp1[0].stat,
                        steps: rsp1[0].steps,
                        session: rsp1[0].session
                    }).then((rsp2) => {
                        gamesessionModel.find({
                            grpid: grpid,
                            current_checkpoint: rsp1[0].currentLevel
                        }).then((rsp3) => {
                            gamesessionModel.updateOne({
                                grpid: grpid,
                                current_checkpoint: rsp1[0].currentLevel
                            }, {
                                _id: rsp3[0]._id,
                                grpid: rsp3[0].grpid,
                                week_start_date: rsp3[0].week_start_date,
                                week_goal: rsp3[0].week_goal,
                                total_achieved_steps: rsp3[0].total_achieved_steps,
                                total_points: (rsp3[0].total_points - 2*quantity),
                                individual_contribution: rsp3[0].individual_contribution,
                                current_checkpoint: rsp3[0].current_checkpoint
                            }).then((rsp4) => {
                                res.send('Item added successfully');
                            }).catch((er5) => {
                                res.send(er5);
                            })
                        }).catch((er6) => {
                            res.send(er6);
                        })
                    }).catch((er7) => {
                        res.send(er7);
                    })
                }).catch((er1) => {
                    res.send(er1);
                })
            }).catch((err) => {
                res.send(err);
            })
        }
    }).catch((er) => {
        res.send(er);
    })
}

module.exports = addItem;