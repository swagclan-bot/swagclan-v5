export default new Module({
    name: "Fun",
    description: "Fun commands for things.",
    emoji: "🎉",
    commands: [
        new Command({
            name: "Lichess",
            description: "Chalenge another user on lichess.",
            emoji: "🐴",
            versions: [
                new Version({
                    triggers: ["lichess", "challenge", "chess"],
                    arguments: [
                        new Argument({
                            name: "user",
                            description: "The user to challenge on lichess.",
                            emoji: "🏷",
                            types: [
                                new Types.Member,
                                new Types.Any
                            ]
                        }),
                        new ArgumentGroup([
                            { order: false },
                            new Argument({
                                name: "variant",
                                description: "The variant of chess to play.",
                                emoji: "🐴",
                                types: [
                                    new Type({
                                        name: "Variant",
                                        description: "A lichess variant.",
                                        examples: ["standard", "chess960", "antichess", "threeCheck"],
                                        validate: function isVariant(message, text) {
                                            return text === "standard";
                                        }
                                    })
                                ]
                            }),
                            new Argument({
                                name: "control",
                                display: "Time control",
                                description: "A chess time control setting.",
                                examples: ["5+3", "10+0", "2d", "bullet", "blitz", "classical"],
                                validate: /^(((1\/2)|(1\/4)|\d+)(\+\d+)|(\d+d)|(blitz)|(rapid)|(bullet)|(classical)(unlimited))$/
                            })
                        ])
                    ]
                })
            ]
        })
    ]
})


        name: "Lichess Challenge",
        description: "Challenge another user on lichess.",
        emoji: "<:lichess:" + config.emoji.lichess + ">",
        versions: [
            new CommandVersion(["lichess", "challenge", "chess"], [
                new CommandSyntax("variants")
            ]),
            new CommandVersion(["lichess", "challenge", "chess"], [
                new CommandArgument({
                    name: "user",
                    description: "The user to challenge on lichess.",
                    emoji: "🏷",
                    types: [ArgumentType.Mention, ArgumentType.Any]
                }),
                new CommandArgument({
                    name: "variant",
                    description: "The variant of chess to play",
                    emoji: "<:horsey:" + config.emoji.horsey + ">",
                    types: [new ArgumentType({
                        name: "Variant",
                        description: "A lichess variant.",
                        examples: ["standard", "chess960", "antichess", "threeCheck"],
                        validate: async function isVariant(message, text) {
                            return !!lichess.variants[text.toLowerCase()];
                        }
                    })],
                    default: "standard"
                }),
                new CommandArgument({
                    name: "control",
                    description: "The custom time control to play.",
                    emoji: "⏰",
                    types: [
                        new ArgumentType({
                            name: "Time Control",
                            description: "A chess time control setting.",
                            examples: ["5+3", "10+0", "2d", "bullet", "blitz", "classical"],
                            validate: /^(((1\/2)|(1\/4)|\d+)(\+\d+)|(\d+d)|(blitz)|(rapid)|(bullet)|(classical)(unlimited))$/
                        })
                    ],
                    optional: true,
                    default: "unlimited"
                }),
                new CommandArgument({
                    name: "colour",
                    description: "The colour to play.",
                    emoji: "⚪",
                    types: [new ArgumentType({
                        name: "black/white/random",
                        description: "A chess colour.",
                        examples: ["black", "white"],
                        validate: /^(black)|(white)|(any)$/i
                    })],
                    optional: true,
                    default: "random"
                })
            ])
        ],
		example: "https://i.imgur.com/DUQJIAN.gif",