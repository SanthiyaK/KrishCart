const mongoose=require('mongoose');

const productSchema =new mongoose.Schema({
    name : {
        type: String,
        required: [true,"please enter product name"],
        trim: true,
        maxlength: [100, "Product name cannot exceed 100 characters"]
    },
    price:{
        type: Number,
        required: true,
        default: 0.0
    },
    description:{
        type:String,
        required: [true,"Please enter product description"]
    },
    ratings:{
        type:String,
        default: 0
    },
    images:[
        {
            image:{
                type: String,
                required: true
            }
        }
    ],
    category:{
        type: String,
        required:[true, " Please enter product category"],
        enum:{
            values:[
                'Kurtis',
                'Pants',
                'Duppatta/Shawl',
                'NightSuits',
                'Palazzo',
                'Cotton Short tops',
                'Puff Sleeve Dress',
                'Maternity',
               
            ],
            message: "Please select correct category"
        }
    },
        seller:{
            type: String,
            required: [true,"Please enter product seller"]
        },
        stock:{
            type: Number,
            required: [true,"Please enter product stock"],
            maxlenth: [1000, "Product stock cannot exceed 1000"]
        },
        numOfReviews:{
            type: Number,
            default: 0
        },
        reviews:[
            {
                user:{
                    type : mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                rating:{
                    type: String,
                    required: true
                },
                comment:{
                    type: String,
                    required: true
                }
            }
        ],
        user: {
            type : mongoose.Schema.Types.ObjectId
            
        }
        ,
        createdAt:{
            type: Date,
            default: Date.now()

        }
}
)

let schema=mongoose.model('Product', productSchema)

module.exports=schema