import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = "https://tuwordpress.online/ambientnoice/public/api";

  constructor(public http: HttpClient) { }

  login(email, password){
    return this.http.post(this.url+'/login',{email:email, password: password});
  }

  register(data){
    return this.http.post(this.url+'/register',data);
  }
  updateUser(data){
    return this.http.post(this.url+'/updateUser',data);
  }

  getCategories(){
    return this.http.get(this.url+'/getCategories');
  }

  getMyStablishments(id, page = 1){
    return this.http.get(this.url+'/getMyStablishments/'+id+'?page='+page);
  }
  getLists(id,page = 1){
    return this.http.get(this.url+'/getLists/'+id+'?page='+page);
  }
  getListsFront(id){
    return this.http.get(this.url+'/getListsFront/'+id);
  }
  getMyOffers(id,page = 1){
    return this.http.get(this.url+'/getMyOffers/'+id+'?page='+page);
  }
  getMyEvents(id,page = 1){
    return this.http.get(this.url+'/getMyEvents/'+id+'?page='+page);
  }

  saveStablishment(data){
    return this.http.post(this.url+'/saveStablishment',data);
  }
  saveReserve(data){
    return this.http.post(this.url+'/saveReserve',data);
  }
  getStablishment(id){
    return this.http.get(this.url+'/getStablishment/'+id);
  }

  saveOcupation(data){
    return this.http.post(this.url+'/saveOcupation',data);
  }
  saveOffer(data){
    return this.http.post(this.url+'/saveOffer',data);
  }
  saveRoom(data){
    return this.http.post(this.url+'/saveRoom',data);
  }
  getRooms(id){
    return this.http.get(this.url+'/getRooms/'+id);
  }
  saveList(data){
    return this.http.post(this.url+'/saveList',data);
  }
  saveEvent(data){
    return this.http.post(this.url+'/saveEvent',data);
  }
  addMenu(data){
    return this.http.post(this.url+'/addMenu',data);
  }
  deleteMenu(id){
    return this.http.get(this.url+'/deleteMenu/'+id);
  }
  addMenuPlate(data){
    return this.http.post(this.url+'/addMenuPlate',data);
  }
  deletePlate(id){
    return this.http.get(this.url+'/deletePlate/'+id);
  }

  getMenus(id){
    return this.http.get(this.url+'/getMenus/'+id);
  }

  deleteList(id){
    return this.http.get(this.url+'/deleteList/'+id);
  }
  deleteOffer(id){
    return this.http.get(this.url+'/deleteOffer/'+id);
  }
  deleteEvent(id){
    return this.http.get(this.url+'/deleteEvent/'+id);
  }
  deleteLocal(id){
    return this.http.get(this.url+'/deleteLocal/'+id);
  }


  /**/
  getAll()
  {
    return this.http.get(this.url+'/getAll');
  }

  getAmbients()
  {
    return this.http.get(this.url+'/getAmbients');
  }
  getEstablishments(data = {},page)
  {
    return this.http.post(this.url+'/getEstablishments?page='+page,data);
  }
  getMenusAndH(id)
  {
    return this.http.get(this.url+'/getMenusAndH/'+id);
  }

  /**/

  getOffers(id)
  {
    return this.http.get(this.url+'/getOffers/'+id);
  }
  getEvents(id)
  {
    return this.http.get(this.url+'/getEvents/'+id);
  }

  getFeaturedOffers()
  {
    return this.http.get(this.url+'/getFeaturedOffers');
  }
  getFeaturedEvents()
  {
    return this.http.get(this.url+'/getFeaturedEvents');
  }
  addRemoveFavorite(data)
  {
    return this.http.post(this.url+'/addRemoveFavorite',data);
  }
  getFavorite(id,e_id)
  {
    return this.http.get(this.url+'/getFavorite/'+id+'/'+e_id);
  }

  getFavorites(id)
  {
    return this.http.get(this.url+'/getFavorites/'+id);
  }

  /**/

  saveOrder(data)
  {
    return this.http.post(this.url+'/saveOrder',data);
  }
  deleteProduct(data)
  {
    return this.http.post(this.url+'/deleteProduct',data);
  }

  updateQuantity(data)
  {
    return this.http.post(this.url+'/updateQuantity',data);
  }
  payOrder(data)
  {
    return this.http.post(this.url+'/payOrder',data);
  }

  getOrders(data)
  {
    return this.http.post(this.url+'/getOrders',data);
  }

  payCloset(data)
  {
    return this.http.post(this.url+'/payCloset',data);
  }

  getCloset(data)
  {
    return this.http.post(this.url+'/getCloset',data);
  }

  retrieveOrders(data)
  {
    return this.http.post(this.url+'/retrieveOrders',data);
  }
  retrieveClosets(data)
  {
    return this.http.post(this.url+'/retrieveClosets',data);
  }

  servir(data)
  {
    return this.http.post(this.url+'/servir',data);
  }

  /**/

  // statusRopero(data)
  // {
  //   return this.http.post(this.url+'/statusRopero',data);
  // }
  asignar(data)
  {
    return this.http.post(this.url+'/asignar',data);
  }
  entregar(data)
  {
    return this.http.post(this.url+'/entregar',data);
  }
  /**/
  getFaqs()
  {
    return this.http.get(this.url+'/getFaqs');
  }

  searchProvinces(data)
  {
    return this.http.post(this.url+'/searchProvinces',data);
  }

  /**/

  getGallery(id)
  {
    return this.http.get(this.url+'/getGallery/'+id);
  }
  getLocalGallery(id)
  {
    return this.http.get(this.url+'/getLocalGallery/'+id);
  }
  // uploadToGallery(data)
  // {
  //   return this.http.post(this.url+'/uploadToGallery',data);
  // }
  // saveToGallery(data)
  // {
  //   return this.http.post(this.url+'/saveToGallery',data);
  // }
  deleteFromGallery(id)
  {
    return this.http.get(this.url+'/deleteFromGallery/'+id);
  }
  changeOrder(data)
  {
    return this.http.post(this.url+'/changeOrder',data);
  }

  loadOtherUsers(id)
  {
    return this.http.get(this.url+'/loadOtherUsers/'+id);
  }
  aprobed(id)
  {
    return this.http.get(this.url+'/aprobed/'+id);
  }


  getLikes(id)
  {
    return this.http.get(this.url+'/getLikes/'+id);
  }
  
  likeGallery(data)
  {
    return this.http.post(this.url+'/likeGallery',data);
  }

  saveMessage(data)
  {
    return this.http.post(this.url+'/saveMessage',data);
  }
  getMessages(data)
  {
    return this.http.post(this.url+'/getMessages',data);
  }

  getListUsers(id)
  {
    return this.http.get(this.url+'/getListUsers/'+id);
  }
  getRoom(id)
  {
    return this.http.get(this.url+'/getRoom/'+id);
  }
  getReserves(id)
  {
    return this.http.get(this.url+'/getReserves/'+id);
  }
  filterUsers(data)
  {
    return this.http.post(this.url+'/filterUsers',data);
  }
  saveRosterUser(data)
  {
    return this.http.post(this.url+'/saveRosterUser',data);
  }
  addGuess(data)
  {
    return this.http.post(this.url+'/addGuess',data);
  }
  saveOneSignalId(data)
  {
    return this.http.post(this.url+'/saveOneSignalId',data);
  }
  //
  reservar(data)
  {
    return this.http.post(this.url+'/reservar',data);
  }
  getReservas(id,local_id)
  {
    return this.http.get(this.url+'/getReservas/'+id+'/'+local_id);
  }

  getCloser(data)
  {
    return this.http.post(this.url+'/getCloser',data);
  }


  comment(data)
  {
    return this.http.post(this.url+'/comment',data);
  }
  
  myComment(id,local_id)
  {
    return this.http.get(this.url+'/myComment/'+id+'/'+local_id);
  }

  //

  contact(data)
  {
    return this.http.post(this.url+'/contact',data);
  }

}
