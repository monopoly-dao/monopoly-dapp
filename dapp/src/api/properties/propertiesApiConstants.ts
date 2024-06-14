export enum PropertiesEndpoints {
  Get_Properties = '/properties',
  Get_Property = '/properties/MDAO-:propertyId',
  Get_Wishlist = '/wishlist/:userId',
  Add_Property_To_Wishlist = '/add-to-wishlist/:propertyId',
  Remove_Property_From_Wishlist = '/remove-from-wishlist/:propertyId',
}
