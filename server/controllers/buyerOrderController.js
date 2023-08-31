/* TODO:

CRUD
poolBuyer: isys2099_group9_app_buyer_user

query for creating ib_ord: put
CALL sp_place_buyer_order(?, ?, ?, (OUT?)), []

 OUT result:
    -1 on rollback
    0 on successful commit
    1 on not enough stockpile
    2 on product_id or buyer_id not exist

query retrive: get
- SELECT * FROM buyer_order;

query update:
- UPDATE buyer_order SET ??

query delete: delete
- DELETE buyer_order WHERE ??

For buyer orders, Buyer can: 

query accpet: post
UPDATE buyer_order SET order_status = 'A'

query reject: post
UPDATE buyer_order SET order_status = 'R'

Errors handling:

    -1 on rollback
    0 on successful commit
    1 on not enough warehouse space to return product
    2 on buyer_order_id not exist

err_msg = concat('Order already accepted.');
err_msg = concat('Order already rejected.');
err_msg = concat('Order already pending.');
err_msg = 'Cannot reopen rejected buyer order. Place a new order with sp_return_product_from_buyer_order() instead.';
err_msg = concat('Cannot accept rejected buyer order. Place a new order with sp_return_product_from_buyer_order() instead.');
err_msg = 'Cannot reopen accepted buyer order. Place a new order with sp_return_product_from_buyer_order() instead.';
err_msg = concat('Cannot reject accepted buyer order.');

*/