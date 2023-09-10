export const categoriesData = [
    { category_name: 'Electronic Devices', parent: null },
    { category_name: 'TV & Home Appliances', parent: null },
    { category_name: 'Earphones', parent: 'Audio' },
    { category_name: 'Headphones', parent: 'Audio' },
    { category_name: 'Speaker', parent: 'Audio' },
    { category_name: 'Computer Mice', parent: 'Computer Peripherals' },
    { category_name: 'Keyboards', parent: 'Computer Peripherals' },
    { category_name: 'Mechanical Keyboard Key-caps', parent: 'Computer Peripherals' },
    { category_name: 'Mechanical Keyboard Switches', parent: 'Computer Peripherals' },
    { category_name: 'Monitors', parent: 'Computer Peripherals' },
    { category_name: 'Audio', parent: 'Electronic Devices' },
    { category_name: 'Computer Peripherals', parent: 'Electronic Devices' },
    { category_name: 'Computers', parent: 'Electronic Devices' },
    { category_name: 'Mobiles', parent: 'Electronic Devices' },
    { category_name: 'Mechanical Keyboards', parent: 'Keyboards' },
    { category_name: 'Large Appliances', parent: 'TV & Home Appliances' },
    { category_name: 'Small Appliances', parent: 'TV & Home Appliances' },
    { category_name: 'Televisions', parent: 'TV & Home Appliances' },
]

export const buyerOrderMockData = [
    {
      "id": 1,
      "quantity": 3,
      "product_id": 1,
      "created_date": "8/6/2023",
      "created_time": "11:30:00",
      "order_status": "A",
      "fulfilled_date": "8/7/2023",
      "fulfilled_time": "15:45:00",
      "buyer": "tony"
    },
    {
      "id": 2,
      "quantity": 1,
      "product_id": 4,
      "created_date": "8/7/2023",
      "created_time": "15:45:00",
      "order_status": "A",
      "fulfilled_date": "8/8/2023",
      "fulfilled_time": "10:20:00",
      "buyer": "tony"
    },
    {
      "id": 3,
      "quantity": 2,
      "product_id": 2,
      "created_date": "8/8/2023",
      "created_time": "10:20:00",
      "order_status": "A",
      "fulfilled_date": "8/9/2023",
      "fulfilled_time": "12:00:00",
      "buyer": "tony"
    },
    {
      "id": 4,
      "quantity": 5,
      "product_id": 3,
      "created_date": "8/9/2023",
      "created_time": "12:00:00",
      "order_status": "R",
      "fulfilled_date": null,
      "fulfilled_time": null,
      "buyer": "tony"
    },
    {
      "id": 5,
      "quantity": 4,
      "product_id": 5,
      "created_date": "8/10/2023",
      "created_time": "14:10:00",
      "order_status": "P",
      "fulfilled_date": null,
      "fulfilled_time": null,
      "buyer": "tony"
    }
]

export const inboundOrderMockData = [
    {
      "id": 1,
      "quantity": 50,
      "product_id": 1,
      "created_date": "8/1/2022",
      "created_time": "10:00:00",
      "fulfilled_date": "8/2/2022",
      "fulfilled_time": "14:30:00",
      "seller": "loi"
    },
    {
      "id": 2,
      "quantity": 30,
      "product_id": 2,
      "created_date": "8/2/2022",
      "created_time": "14:30:00",
      "fulfilled_date": "8/3/2022",
      "fulfilled_time": "9:45:00",
      "seller": "loi"
    },
    {
      "id": 3,
      "quantity": 20,
      "product_id": 3,
      "created_date": "8/3/2022",
      "created_time": "9:45:00",
      "fulfilled_date": null,
      "fulfilled_time": null,
      "seller": "loi"
    },
    {
      "id": 4,
      "quantity": 15,
      "product_id": 4,
      "created_date": "8/4/2022",
      "created_time": "13:20:00",
      "fulfilled_date": null,
      "fulfilled_time": null,
      "seller": "loi"
    },
    {
      "id": 5,
      "quantity": 60,
      "product_id": 5,
      "created_date": "8/5/2022",
      "created_time": "16:15:00",
      "fulfilled_date": null,
      "fulfilled_time": null,
      "seller": "loi"
    },
    {
      "id": 6,
      "quantity": 50,
      "product_id": 11,
      "created_date": "8/1/2022",
      "created_time": "10:00:00",
      "fulfilled_date": "8/2/2022",
      "fulfilled_time": "14:30:00",
      "seller": "mike"
    },
    {
      "id": 7,
      "quantity": 30,
      "product_id": 12,
      "created_date": "8/2/2022",
      "created_time": "14:30:00",
      "fulfilled_date": "8/3/2022",
      "fulfilled_time": "9:45:00",
      "seller": "mike"
    },
    {
      "id": 8,
      "quantity": 20,
      "product_id": 13,
      "created_date": "8/3/2022",
      "created_time": "9:45:00",
      "fulfilled_date": null,
      "fulfilled_time": null,
      "seller": "mike"
    },
    {
      "id": 9,
      "quantity": 15,
      "product_id": 14,
      "created_date": "8/4/2022",
      "created_time": "13:20:00",
      "fulfilled_date": null,
      "fulfilled_time": null,
      "seller": "mike"
    },
    {
      "id": 10,
      "quantity": 60,
      "product_id": 15,
      "created_date": "8/5/2022",
      "created_time": "16:15:00",
      "fulfilled_date": null,
      "fulfilled_time": null,
      "seller": "mike"
    }
]
  
  