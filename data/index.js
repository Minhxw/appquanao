//1
const ao1150 ={
    id:1,
    productName:'Ao nam',
    price:100,
    imageUrl150:'ao1150.jpg',
    imageUrl400:'ao1400.jpg',
    rating:4.0, // <=5
    nameShop:'QuanAoShop',
    description:'',
    sold:15,
    quantity:21,
    category:'QuanAoNam',
}
//2
const ao2150 ={
    id:2,
    productName:'Quần áo Nam 2',
    price:200,
    imageUrl150:'ao2150.jpg',
    imageUrl400:'ao2400.jpg',
    rating:4.0, // <=5
    nameShop:'QuanAoShop',
    description:'',
    sold:15,
    quantity:21,
    category:'QuanAoNam',
}
//3
const ao3150 ={
    id:3,
    productName:'Quần áo Nam 3',
    price:2490000,
    imageUrl150:'ao3150.jpg',
    imageUrl400:'ao3400.jpg',
    rating:4.0, // <=5
    nameShop:'QuanAoShop',
    description:'',
    sold:15,
    quantity:21,
    category:'QuanAoNam',
}
//4
const ao4150 ={
    id:4,
    productName:'Quần áo Nam 4',
    price:2490000,
    imageUrl150:'ao4150.jpg',
    imageUrl400:'ao4400.jpg',
    rating:4.0, // <=5
    nameShop:'QuanAoShop',
    description:'',
    sold:15,
    quantity:21,
    category:'QuanAoNam',
}
//5
const ao5150 ={
    id:5,
    productName:'Quần áo Nam 5',
    price:2490000,
    imageUrl150:'ao5150.jpg',
    imageUrl400:'ao5400.jpg',
    rating:4.0, // <=5
    nameShop:'QuanAoShop',
    description:'',
    sold:15,
    quantity:21,
    category:'QuanAoNam',
}
//6
const ao6150 ={
    id:6,
    productName:'Quần áo Nam 6',
    price:2490000,
    imageUrl150:'ao6150.jpg',
    imageUrl400:'ao6400.jpg',
    rating:4.0, // <=5
    nameShop:'QuanAoShop',
    description:'',
    sold:15,
    quantity:21,
    category:'QuanAoNam',
}
//7
const ao7150 ={
    id:7,
    productName:'Quần áo Nam 7',
    price:2490000,
    imageUrl150:'ao7150.jpg',
    imageUrl400:'ao7400.jpg',
    rating:4.0, // <=5
    nameShop:'QuanAoShop',
    description:'',
    sold:15,
    quantity:21,
    category:'QuanAoNam',
}
//8
const ao8150 ={
    id:8,
    productName:'Quần áo Nam 8',
    price:2490000,
    imageUrl150:'ao8150.jpg',
    imageUrl400:'ao8400.jpg',
    rating:4.0, // <=5
    nameShop:'QuanAoShop',
    description:'',
    sold:15,
    quantity:21,
    category:'QuanAoNam',
}
//9
const ao9150 ={
    id:9,
    productName:'Quần áo Nam 9',
    price:2490000,
    imageUrl150:'ao9150.jpg',
    imageUrl400:'ao9400.jpg',
    rating:4.0, // <=5
    nameShop:'QuanAoShop',
    description:'',
    sold:15,
    quantity:21,
    category:'QuanAoNam',
}
//10
const ao10150 ={
    id:10,
    productName:'Quần áo Nam 10',
    price:2490000,
    imageUrl150:'ao10150.jpg',
    imageUrl400:'ao10400.jpg',
    rating:4.0, // <=5
    nameShop:'QuanAoShop',
    description:'',
    sold:15,
    quantity:21,
    category:'QuanAoNam',
}




const User1 ={
    name:'Hồ Công Minh',
    genrder:true,
    dateOfBirth:'01/03/2002',
    phoneNumber:'091234567',
    email:'congminh@gmail.com',
    address:'',
    role:'user', //user
}



const producData=[
    {
        ...ao1150,
    },
   
    

]
const categoriesData = [
    {
        id:1,
        categoryName:'Best Seller',
        products:[
            1,2,3,4 //id
        ]
    },
    {
        id:2,
        categoryName:'The Lastest',
        products:[
            9,14,22,21
        ]
    },
    {
        id:2,
        categoryName:'Coming Soon',
        products:[
            5,20,15,25
        ]
    },
]


export {producData,categoriesData}
