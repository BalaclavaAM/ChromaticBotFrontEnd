import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SpotifyLoginInfo } from 'src/app/models/spotifyLoginInfo';
import { SpotifyTopInfo } from 'src/app/models/spotifyTopInfo';
import { SpotifyService } from 'src/app/services/spotify.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  userProfile: SpotifyLoginInfo | undefined = this.userInfoService.userInfo;

  isLoggedIn: boolean = this.userInfoService.loggedIn;

  imagesInfo: SpotifyTopInfo[] = [
    {
        "album": "Resistencia",
        "image": "https://i.scdn.co/image/ab67616d0000b273b2aec01b56eeb74610532700",
        "colors": [
            [
                124,
                29,
                5
            ],
            [
                22,
                9,
                7
            ],
            [
                240,
                240,
                240
            ],
            [
                238,
                58,
                4
            ],
            [
                145,
                140,
                140
            ],
            [
                212,
                156,
                132
            ]
        ],
        "dominant": [
            240,
            240,
            240
        ],
        "colorfulness": 0,
        "songs": [
            {
                "name": "Yandel 150",
                "artists": "Yandel, Feid"
            }
        ]
    },
    {
        "album": "S.A.L.T (Chapter 3 - the Main Course)",
        "image": "https://i.scdn.co/image/ab67616d0000b273a09148024e1334f0af207729",
        "colors": [
            [
                235,
                234,
                234
            ],
            [
                52,
                38,
                77
            ],
            [
                135,
                40,
                30
            ],
            [
                216,
                152,
                24
            ],
            [
                139,
                143,
                169
            ],
            [
                192,
                144,
                142
            ]
        ],
        "dominant": [
            235,
            234,
            234
        ],
        "colorfulness": 0,
        "songs": [
            {
                "name": "No Ego Food",
                "artists": "AvenREC, Vic Deal"
            }
        ]
    },
    {
        "album": "El Madrileño",
        "image": "https://i.scdn.co/image/ab67616d0000b273a408c78e231f716383a58eb3",
        "colors": [
            [
                170,
                70,
                60
            ],
            [
                190,
                195,
                202
            ],
            [
                30,
                24,
                23
            ],
            [
                177,
                138,
                124
            ],
            [
                196,
                166,
                150
            ],
            [
                103,
                70,
                60
            ]
        ],
        "dominant": [
            170,
            74,
            64
        ],
        "colorfulness": 0.015723270440251586,
        "songs": [
            {
                "name": "CAMBIA!",
                "artists": "C. Tangana, Carin Leon, Adriel Favela"
            },
            {
                "name": "Tú Me Dejaste De Querer",
                "artists": "C. Tangana, Niño de Elche, La Húngara"
            },
            {
                "name": "Párteme La Cara",
                "artists": "C. Tangana, Ed Maverick"
            },
            {
                "name": "Te Olvidaste",
                "artists": "C. Tangana, Omar Apollo"
            },
            {
                "name": "Cuándo Olvidaré",
                "artists": "C. Tangana, Pepe Blanco"
            }
        ]
    },
    {
        "album": "The Slow Rush",
        "image": "https://i.scdn.co/image/ab67616d0000b27358267bd34420a00d5cf83a49",
        "colors": [
            [
                145,
                31,
                15
            ],
            [
                199,
                185,
                164
            ],
            [
                61,
                24,
                13
            ],
            [
                217,
                83,
                50
            ],
            [
                186,
                99,
                64
            ],
            [
                116,
                138,
                140
            ]
        ],
        "dominant": [
            147,
            34,
            17
        ],
        "colorfulness": 0.02179487179487179,
        "songs": [
            {
                "name": "Borderline",
                "artists": "Tame Impala"
            }
        ]
    },
    {
        "album": "Manzanas a la Vuelta",
        "image": "https://i.scdn.co/image/ab67616d0000b27328f61734580994bdf0819891",
        "colors": [
            [
                149,
                88,
                78
            ],
            [
                46,
                42,
                41
            ],
            [
                180,
                183,
                184
            ],
            [
                225,
                130,
                117
            ],
            [
                182,
                174,
                164
            ],
            [
                151,
                150,
                148
            ]
        ],
        "dominant": [
            150,
            99,
            90
        ],
        "colorfulness": 0.024999999999999984,
        "songs": [
            {
                "name": "$. A. N. T. E. R. Í. A.",
                "artists": "Doble Porcion, Métricas Frías, Mañas Ru-Fino, Zof Ziro"
            }
        ]
    },
    {
        "album": "Vibras",
        "image": "https://i.scdn.co/image/ab67616d0000b273dda2b86297d3bfb519f8b785",
        "colors": [
            [
                243,
                91,
                36
            ],
            [
                27,
                23,
                24
            ],
            [
                245,
                239,
                236
            ],
            [
                204,
                166,
                152
            ],
            [
                240,
                76,
                23
            ],
            [
                200,
                144,
                124
            ]
        ],
        "dominant": [
            243,
            92,
            36
        ],
        "colorfulness": 0.045088566827697275,
        "songs": [
            {
                "name": "En Mí",
                "artists": "J Balvin"
            }
        ]
    },
    {
        "album": "SATURNO",
        "image": "https://i.scdn.co/image/ab67616d0000b27377ca8a929a08890cb6c8691c",
        "colors": [
            [
                53,
                60,
                77
            ],
            [
                214,
                217,
                233
            ],
            [
                203,
                135,
                88
            ],
            [
                162,
                84,
                52
            ],
            [
                131,
                142,
                169
            ],
            [
                178,
                151,
                141
            ]
        ],
        "dominant": [
            112,
            79,
            63
        ],
        "colorfulness": 0.054421768707483,
        "songs": [
            {
                "name": "DIME QUIÉN????",
                "artists": "Rauw Alejandro"
            },
            {
                "name": "LOKERA",
                "artists": "Rauw Alejandro, Lyanno, Brray"
            }
        ]
    },
    {
        "album": "Afrodisíaco",
        "image": "https://i.scdn.co/image/ab67616d0000b2733926e048d839e1173fe17326",
        "colors": [
            [
                181,
                155,
                112
            ],
            [
                8,
                7,
                7
            ],
            [
                93,
                64,
                49
            ],
            [
                41,
                99,
                160
            ],
            [
                44,
                155,
                214
            ],
            [
                138,
                69,
                42
            ]
        ],
        "dominant": [
            19,
            15,
            13
        ],
        "colorfulness": 0.05555555555555556,
        "songs": [
            {
                "name": "De Cora <3",
                "artists": "Rauw Alejandro, J Balvin"
            }
        ]
    },
    {
        "album": "DESVELADO",
        "image": "https://i.scdn.co/image/ab67616d0000b273dfddf1cb31b85a6d28b7d91f",
        "colors": [
            [
                24,
                19,
                35
            ],
            [
                207,
                59,
                25
            ],
            [
                236,
                248,
                193
            ],
            [
                106,
                21,
                18
            ],
            [
                23,
                185,
                209
            ],
            [
                28,
                93,
                177
            ]
        ],
        "dominant": [
            220,
            143,
            100
        ],
        "colorfulness": 0.05972222222222221,
        "songs": [
            {
                "name": "Ella Baila Sola",
                "artists": "Eslabon Armado, Peso Pluma"
            }
        ]
    },
    {
        "album": "pa quererte",
        "image": "https://i.scdn.co/image/ab67616d0000b273b27f643b59cf605c641074c3",
        "colors": [
            [
                118,
                105,
                96
            ],
            [
                224,
                129,
                76
            ],
            [
                240,
                209,
                109
            ],
            [
                39,
                30,
                25
            ],
            [
                153,
                157,
                183
            ],
            [
                102,
                36,
                33
            ]
        ],
        "dominant": [
            117,
            101,
            92
        ],
        "colorfulness": 0.05999999999999998,
        "songs": [
            {
                "name": "pa quererte",
                "artists": "Rels B"
            }
        ]
    },
    {
        "album": "Pantone",
        "image": "https://i.scdn.co/image/ab67616d0000b273156a4348c93c2fdb56743b63",
        "colors": [
            [
                7,
                7,
                7
            ],
            [
                222,
                211,
                200
            ],
            [
                40,
                150,
                166
            ],
            [
                179,
                53,
                66
            ],
            [
                96,
                90,
                89
            ],
            [
                89,
                75,
                146
            ]
        ],
        "dominant": [
            219,
            200,
            189
        ],
        "colorfulness": 0.061111111111111095,
        "songs": [
            {
                "name": "Pico y Chao",
                "artists": "No Rules Clan, Ignorancia Sofisticada"
            }
        ]
    },
    {
        "album": "un x100to",
        "image": "https://i.scdn.co/image/ab67616d0000b273716c0b0ad51594ff788b5f06",
        "colors": [
            [
                34,
                34,
                37
            ],
            [
                189,
                169,
                157
            ],
            [
                139,
                115,
                102
            ],
            [
                154,
                168,
                188
            ],
            [
                121,
                135,
                167
            ],
            [
                180,
                84,
                76
            ]
        ],
        "dominant": [
            189,
            169,
            157
        ],
        "colorfulness": 0.062499999999999924,
        "songs": [
            {
                "name": "un x100to",
                "artists": "Grupo Frontera, Bad Bunny"
            }
        ]
    },
    {
        "album": "DATA",
        "image": "https://i.scdn.co/image/ab67616d0000b273de7b9af78fbdda96c5a0635b",
        "colors": [
            [
                35,
                39,
                43
            ],
            [
                215,
                190,
                170
            ],
            [
                116,
                106,
                103
            ],
            [
                98,
                128,
                135
            ],
            [
                143,
                152,
                140
            ],
            [
                168,
                79,
                97
            ]
        ],
        "dominant": [
            215,
            189,
            169
        ],
        "colorfulness": 0.07246376811594207,
        "songs": [
            {
                "name": "MOJABI GHOST",
                "artists": "Tainy, Bad Bunny"
            }
        ]
    },
    {
        "album": "Mr. Morale & The Big Steppers",
        "image": "https://i.scdn.co/image/ab67616d0000b2732e02117d76426a08ac7c174f",
        "colors": [
            [
                63,
                42,
                26
            ],
            [
                196,
                187,
                165
            ],
            [
                147,
                160,
                158
            ],
            [
                145,
                117,
                85
            ],
            [
                113,
                113,
                101
            ],
            [
                165,
                150,
                113
            ]
        ],
        "dominant": [
            67,
            48,
            33
        ],
        "colorfulness": 0.07352941176470586,
        "songs": [
            {
                "name": "Count Me Out",
                "artists": "Kendrick Lamar"
            },
            {
                "name": "Crown",
                "artists": "Kendrick Lamar"
            }
        ]
    },
    {
        "album": "SEN2 KBRN VOL. 2",
        "image": "https://i.scdn.co/image/ab67616d0000b273dce7a3fb14f5e841c0befbbf",
        "colors": [
            [
                30,
                19,
                14
            ],
            [
                183,
                105,
                45
            ],
            [
                115,
                68,
                35
            ],
            [
                223,
                182,
                127
            ],
            [
                122,
                116,
                108
            ],
            [
                138,
                128,
                127
            ]
        ],
        "dominant": [
            185,
            110,
            50
        ],
        "colorfulness": 0.07407407407407408,
        "songs": [
            {
                "name": "Mbappe",
                "artists": "Eladio Carrion"
            }
        ]
    },
    {
        "album": "BIEN O MAL",
        "image": "https://i.scdn.co/image/ab67616d0000b2732ccbe28be97225ae844bef55",
        "colors": [
            [
                47,
                40,
                38
            ],
            [
                178,
                131,
                94
            ],
            [
                120,
                73,
                53
            ],
            [
                137,
                116,
                88
            ],
            [
                108,
                108,
                100
            ],
            [
                148,
                68,
                60
            ]
        ],
        "dominant": [
            181,
            134,
            96
        ],
        "colorfulness": 0.07450980392156864,
        "songs": [
            {
                "name": "FEEL ME??",
                "artists": "Trueno"
            }
        ]
    },
    {
        "album": "Un Ep de Maat",
        "image": "https://i.scdn.co/image/ab67616d0000b273c08847f6cb2eff0ae708d8e9",
        "colors": [
            [
                189,
                147,
                139
            ],
            [
                28,
                27,
                26
            ],
            [
                111,
                80,
                58
            ],
            [
                140,
                140,
                140
            ],
            [
                132,
                132,
                132
            ],
            [
                84,
                84,
                84
            ]
        ],
        "dominant": [
            28,
            27,
            26
        ],
        "colorfulness": 0.08333333333333333,
        "songs": [
            {
                "name": "Fargo",
                "artists": "Luis7Lunes, Maco Maat"
            }
        ]
    },
    {
        "album": "Go Die",
        "image": "https://i.scdn.co/image/ab67616d0000b273d4aa74e7868cee9520b8e6a6",
        "colors": [
            [
                209,
                181,
                151
            ],
            [
                51,
                46,
                43
            ],
            [
                140,
                108,
                91
            ],
            [
                163,
                164,
                155
            ],
            [
                161,
                155,
                150
            ],
            [
                107,
                108,
                101
            ]
        ],
        "dominant": [
            52,
            48,
            44
        ],
        "colorfulness": 0.08333333333333333,
        "songs": [
            {
                "name": "Así Soy",
                "artists": "Anyone/Cualkiera, Ignorancia Sofisticada"
            }
        ]
    },
    {
        "album": "yo pr1mero",
        "image": "https://i.scdn.co/image/ab67616d0000b273f311158d6d53aeffc3897b3c",
        "colors": [
            [
                225,
                227,
                231
            ],
            [
                48,
                46,
                45
            ],
            [
                161,
                174,
                183
            ],
            [
                139,
                120,
                102
            ],
            [
                135,
                148,
                165
            ],
            [
                103,
                117,
                110
            ]
        ],
        "dominant": [
            52,
            51,
            50
        ],
        "colorfulness": 0.08333333333333363,
        "songs": [
            {
                "name": "yo pr1mero",
                "artists": "Rels B"
            }
        ]
    },
    {
        "album": "MICRODOSIS",
        "image": "https://i.scdn.co/image/ab67616d0000b273851222dc5c5681bd4c3119d3",
        "colors": [
            [
                185,
                165,
                143
            ],
            [
                41,
                40,
                27
            ],
            [
                99,
                69,
                50
            ],
            [
                116,
                93,
                53
            ],
            [
                117,
                100,
                76
            ],
            [
                220,
                213,
                205
            ]
        ],
        "dominant": [
            181,
            161,
            139
        ],
        "colorfulness": 0.08730158730158728,
        "songs": [
            {
                "name": "badtrip :(",
                "artists": "Mora"
            }
        ]
    },
    {
        "album": "Todos Tienen Que Comer",
        "image": "https://i.scdn.co/image/ab67616d0000b273cd02321fa6e8203bdff5c3fd",
        "colors": [
            [
                230,
                216,
                193
            ],
            [
                35,
                31,
                36
            ],
            [
                182,
                63,
                50
            ],
            [
                206,
                141,
                44
            ],
            [
                185,
                151,
                109
            ],
            [
                215,
                153,
                152
            ]
        ],
        "dominant": [
            229,
            215,
            193
        ],
        "colorfulness": 0.10185185185185185,
        "songs": [
            {
                "name": "Desvaneciendo",
                "artists": "Crudo Means Raw"
            },
            {
                "name": "Horas Extras",
                "artists": "Crudo Means Raw, DJ Dmoe"
            }
        ]
    },
    {
        "album": "lo que hay x aquí",
        "image": "https://i.scdn.co/image/ab67616d0000b27385acf6becb994eb3cf3edd15",
        "colors": [
            [
                117,
                112,
                98
            ],
            [
                203,
                200,
                189
            ],
            [
                40,
                38,
                35
            ],
            [
                179,
                179,
                180
            ],
            [
                180,
                188,
                175
            ],
            [
                63,
                43,
                32
            ]
        ],
        "dominant": [
            117,
            112,
            98
        ],
        "colorfulness": 0.12280701754385966,
        "songs": [
            {
                "name": "lo que hay x aquí",
                "artists": "Rels B"
            }
        ]
    },
    {
        "album": "Un Veneno",
        "image": "https://i.scdn.co/image/ab67616d0000b273c551e371093ef44eb1466b84",
        "colors": [
            [
                38,
                37,
                36
            ],
            [
                225,
                201,
                60
            ],
            [
                81,
                131,
                164
            ],
            [
                148,
                109,
                93
            ],
            [
                177,
                171,
                153
            ],
            [
                199,
                29,
                31
            ]
        ],
        "dominant": [
            222,
            188,
            62
        ],
        "colorfulness": 0.13125,
        "songs": [
            {
                "name": "Un Veneno",
                "artists": "C. Tangana, Niño de Elche"
            }
        ]
    },
    {
        "album": "BOICOT",
        "image": "https://i.scdn.co/image/ab67616d0000b2732a27613dce34fb710005a053",
        "colors": [
            [
                246,
                242,
                223
            ],
            [
                101,
                104,
                97
            ],
            [
                145,
                147,
                141
            ],
            [
                170,
                171,
                159
            ],
            [
                186,
                189,
                180
            ],
            [
                156,
                148,
                142
            ]
        ],
        "dominant": [
            246,
            242,
            223
        ],
        "colorfulness": 0.13768115942028977,
        "songs": [
            {
                "name": "Pierdo el sentido",
                "artists": "Alizzz"
            }
        ]
    },
    {
        "album": "INTER SHIBUYA - LA MAFIA",
        "image": "https://i.scdn.co/image/ab67616d0000b2733d7b95838b533131d1db6292",
        "colors": [
            [
                251,
                250,
                232
            ],
            [
                43,
                113,
                116
            ],
            [
                222,
                34,
                139
            ],
            [
                220,
                224,
                39
            ],
            [
                189,
                198,
                143
            ],
            [
                156,
                213,
                218
            ]
        ],
        "dominant": [
            250,
            249,
            232
        ],
        "colorfulness": 0.15740740740740744,
        "songs": [
            {
                "name": "EL PADRINO",
                "artists": "Feid"
            }
        ]
    },
    {
        "album": "Primer Dia de Clases",
        "image": "https://i.scdn.co/image/ab67616d0000b273dcec31b44548687b2a81d0c2",
        "colors": [
            [
                224,
                213,
                201
            ],
            [
                27,
                26,
                19
            ],
            [
                179,
                59,
                24
            ],
            [
                192,
                140,
                57
            ],
            [
                205,
                172,
                113
            ],
            [
                80,
                160,
                131
            ]
        ],
        "dominant": [
            27,
            27,
            20
        ],
        "colorfulness": 0.16666666666666666,
        "songs": [
            {
                "name": "512",
                "artists": "Mora, Jhayco"
            }
        ]
    },
    {
        "album": "plan",
        "image": "https://i.scdn.co/image/ab67616d0000b273216f5a5804da873739ac68f9",
        "colors": [
            [
                104,
                116,
                62
            ],
            [
                198,
                208,
                211
            ],
            [
                131,
                158,
                146
            ],
            [
                65,
                47,
                29
            ],
            [
                199,
                131,
                100
            ],
            [
                158,
                189,
                144
            ]
        ],
        "dominant": [
            111,
            127,
            82
        ],
        "colorfulness": 0.22592592592592595,
        "songs": [
            {
                "name": "plan",
                "artists": "Alex Ponce"
            }
        ]
    },
    {
        "album": "SIXDO",
        "image": "https://i.scdn.co/image/ab67616d0000b2737cc7b0d6a82846cd8b158f99",
        "colors": [
            [
                91,
                166,
                78
            ],
            [
                24,
                45,
                43
            ],
            [
                172,
                189,
                108
            ],
            [
                31,
                138,
                73
            ],
            [
                58,
                104,
                69
            ],
            [
                119,
                169,
                155
            ]
        ],
        "dominant": [
            85,
            162,
            78
        ],
        "colorfulness": 0.3194444444444445,
        "songs": [
            {
                "name": "Le Pido a DIOS",
                "artists": "Feid, DJ Premier"
            }
        ]
    },
    {
        "album": "FELIZ CUMPLEAÑOS FERXXO TE PIRATEAMOS EL ÁLBUM",
        "image": "https://i.scdn.co/image/ab67616d0000b27373456ed697350847810e52b3",
        "colors": [
            [
                215,
                219,
                175
            ],
            [
                43,
                96,
                75
            ],
            [
                116,
                193,
                71
            ],
            [
                6,
                26,
                20
            ],
            [
                103,
                126,
                139
            ],
            [
                148,
                164,
                175
            ]
        ],
        "dominant": [
            44,
            97,
            76
        ],
        "colorfulness": 0.43396226415094336,
        "songs": [
            {
                "name": "Belixe",
                "artists": "Feid"
            }
        ]
    },
    {
        "album": "2014 Forest Hills Drive",
        "image": "https://i.scdn.co/image/ab67616d0000b273c6e0948bbb0681ff29cdbae8",
        "colors": [
            [
                47,
                55,
                53
            ],
            [
                173,
                183,
                193
            ],
            [
                98,
                132,
                172
            ],
            [
                104,
                120,
                131
            ],
            [
                139,
                169,
                199
            ],
            [
                110,
                86,
                81
            ]
        ],
        "dominant": [
            48,
            55,
            53
        ],
        "colorfulness": 0.4523809523809524,
        "songs": [
            {
                "name": "No Role Modelz",
                "artists": "J. Cole"
            }
        ]
    },
    {
        "album": "Aztlán",
        "image": "https://i.scdn.co/image/ab67616d0000b2731eada1495a082da8a6c3e516",
        "colors": [
            [
                153,
                171,
                183
            ],
            [
                16,
                84,
                118
            ],
            [
                177,
                56,
                104
            ],
            [
                120,
                99,
                117
            ],
            [
                123,
                91,
                76
            ],
            [
                228,
                188,
                207
            ]
        ],
        "dominant": [
            151,
            167,
            179
        ],
        "colorfulness": 0.5714285714285713,
        "songs": [
            {
                "name": "Hielo",
                "artists": "Zoé"
            },
            {
                "name": "No Hay Mal Que Dure",
                "artists": "Zoé"
            }
        ]
    },
    {
        "album": "Estrecho / Alvarado (feat. pablopablo)",
        "image": "https://i.scdn.co/image/ab67616d0000b273ccd321b7acba73b5d2ce1eb5",
        "colors": [
            [
                182,
                187,
                181
            ],
            [
                68,
                79,
                106
            ],
            [
                20,
                23,
                25
            ],
            [
                141,
                139,
                117
            ],
            [
                159,
                189,
                192
            ],
            [
                134,
                159,
                184
            ]
        ],
        "dominant": [
            87,
            94,
            109
        ],
        "colorfulness": 0.6136363636363636,
        "songs": [
            {
                "name": "Estrecho / Alvarado (feat. pablopablo)",
                "artists": "C. Tangana, pablopablo"
            }
        ]
    },
    {
        "album": "Atrevido",
        "image": "https://i.scdn.co/image/ab67616d0000b273f4483d4440a89a2cab3b5141",
        "colors": [
            [
                18,
                21,
                28
            ],
            [
                36,
                103,
                175
            ],
            [
                157,
                194,
                240
            ],
            [
                37,
                70,
                110
            ],
            [
                132,
                132,
                132
            ],
            [
                84,
                84,
                84
            ]
        ],
        "dominant": [
            18,
            21,
            29
        ],
        "colorfulness": 0.6212121212121212,
        "songs": [
            {
                "name": "Mamichula - con Nicki Nicole",
                "artists": "Trueno, Nicki Nicole, Bizarrap, Taiu, TATOOL"
            }
        ]
    },
    {
        "album": "DIME QUIÉN????",
        "image": "https://i.scdn.co/image/ab67616d0000b273925c78f35142fa6d8e75b5d8",
        "colors": [
            [
                37,
                38,
                43
            ],
            [
                192,
                169,
                129
            ],
            [
                131,
                112,
                82
            ],
            [
                152,
                161,
                127
            ],
            [
                96,
                102,
                92
            ],
            [
                148,
                146,
                148
            ]
        ],
        "dominant": [
            36,
            37,
            42
        ],
        "colorfulness": 0.6388888888888888,
        "songs": [
            {
                "name": "DIME QUIÉN????",
                "artists": "Rauw Alejandro"
            }
        ]
    },
    {
        "album": "Timelezz",
        "image": "https://i.scdn.co/image/ab67616d0000b27321ee2e52263690b0b2c80c2a",
        "colors": [
            [
                198,
                196,
                202
            ],
            [
                68,
                65,
                79
            ],
            [
                127,
                129,
                140
            ],
            [
                95,
                104,
                116
            ],
            [
                145,
                150,
                161
            ],
            [
                165,
                100,
                99
            ]
        ],
        "dominant": [
            196,
            195,
            201
        ],
        "colorfulness": 0.6944444444444451,
        "songs": [
            {
                "name": "Kobe En LA 2.0",
                "artists": "Jhayco"
            }
        ]
    },
    {
        "album": "Kobe En LA",
        "image": "https://i.scdn.co/image/ab67616d0000b273cbf165ee04a414e7f531562e",
        "colors": [
            [
                217,
                153,
                86
            ],
            [
                21,
                23,
                27
            ],
            [
                99,
                53,
                27
            ],
            [
                117,
                124,
                101
            ],
            [
                36,
                80,
                109
            ],
            [
                60,
                116,
                140
            ]
        ],
        "dominant": [
            26,
            25,
            27
        ],
        "colorfulness": 0.75,
        "songs": [
            {
                "name": "Kobe En LA",
                "artists": "Jhayco"
            }
        ]
    },
    {
        "album": "Currents",
        "image": "https://i.scdn.co/image/ab67616d0000b2739e1cfc756886ac782e363d79",
        "colors": [
            [
                206,
                163,
                194
            ],
            [
                28,
                24,
                29
            ],
            [
                149,
                115,
                169
            ],
            [
                122,
                96,
                130
            ],
            [
                84,
                63,
                106
            ],
            [
                143,
                142,
                142
            ]
        ],
        "dominant": [
            37,
            31,
            41
        ],
        "colorfulness": 0.7666666666666667,
        "songs": [
            {
                "name": "The Less I Know The Better",
                "artists": "Tame Impala"
            },
            {
                "name": "New Person, Same Old Mistakes",
                "artists": "Tame Impala"
            }
        ]
    },
    {
        "album": "Graduation",
        "image": "https://i.scdn.co/image/ab67616d0000b27326f7f19c7f0381e56156c94a",
        "colors": [
            [
                148,
                75,
                126
            ],
            [
                225,
                222,
                185
            ],
            [
                37,
                57,
                64
            ],
            [
                226,
                74,
                112
            ],
            [
                132,
                90,
                51
            ],
            [
                156,
                157,
                206
            ]
        ],
        "dominant": [
            154,
            74,
            126
        ],
        "colorfulness": 0.8916666666666666,
        "songs": [
            {
                "name": "Flashing Lights",
                "artists": "Kanye West, Dwele"
            }
        ]
    },
    {
        "album": "Who Really Cares",
        "image": "https://i.scdn.co/image/ab67616d0000b27332f5fec7a879ed6ef28f0dfd",
        "colors": [
            [
                23,
                62,
                147
            ],
            [
                224,
                28,
                131
            ],
            [
                8,
                4,
                6
            ],
            [
                102,
                9,
                61
            ],
            [
                16,
                24,
                71
            ],
            [
                140,
                5,
                76
            ]
        ],
        "dominant": [
            224,
            28,
            130
        ],
        "colorfulness": 0.9132653061224489,
        "songs": [
            {
                "name": "Not Allowed",
                "artists": "TV Girl"
            }
        ]
    },
    {
        "album": "Limon Y Sal",
        "image": "https://i.scdn.co/image/ab67616d0000b273a043fa84be801dca33dacca1",
        "colors": [
            [
                221,
                167,
                161
            ],
            [
                26,
                34,
                29
            ],
            [
                95,
                67,
                214
            ],
            [
                81,
                175,
                126
            ],
            [
                132,
                74,
                84
            ],
            [
                193,
                27,
                226
            ]
        ],
        "dominant": [
            219,
            158,
            165
        ],
        "colorfulness": 0.9808743169398907,
        "songs": [
            {
                "name": "Eres para Mí (with Anita Tijoux)",
                "artists": "Julieta Venegas, Ana Tijoux"
            }
        ]
    },
    {
        "album": "VICE VERSA",
        "image": "https://i.scdn.co/image/ab67616d0000b273d9525f27b0a9e25b1fa21230",
        "colors": [
            [
                55,
                7,
                116
            ],
            [
                219,
                52,
                61
            ],
            [
                46,
                199,
                244
            ],
            [
                211,
                235,
                237
            ],
            [
                78,
                18,
                21
            ],
            [
                67,
                115,
                198
            ]
        ],
        "dominant": [
            216,
            121,
            127
        ],
        "colorfulness": 0.9894736842105263,
        "songs": [
            {
                "name": "Desenfocao'",
                "artists": "Rauw Alejandro"
            }
        ]
    }
];

  constructor(
    public translate: TranslateService,
    private spotifyService: SpotifyService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {
    this.userInfoService.onChanged.subscribe((userInfo) => {
      this.userProfile = userInfo;
    });
    this.userInfoService.onLoggedInChanged.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  login(): void {
    this.spotifyService.login();
  }

  getTop50Tracks(): void {
    this.spotifyService.getTop50Tracks().subscribe((res) => {
      console.log(res);
      this.imagesInfo = res;
    });
  }
}
