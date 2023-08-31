/* TODO:

CRUD
poolSeller: isys2099_group9_app_seller_user

query for creating ib_ord: put
- Insert INTO view_inbound_order_noid

query retrive: get
- SELECT * FROM inbound_order;

query update: post
- UPDATE inbound_order SET ??

query delete: delete
- DELETE inbound_order WHERE ??

For inbound orders, Seller can: 

query fulfill: post
let result;
CALL sp_fulfill_inbound_order(?, ?), [inbound_order_id, result];

 OUT result:
    -1 on rollback (500)
    0 on successful commit (200)
    1 on no available warehouses (all wh full) or inbound order already fulfilled (DUP)
    2 on inbound_order_id does not exist (404)

*/