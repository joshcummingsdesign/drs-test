@RequestMapping(value="user", method = RequestMethod.GET)
public @ResponseBody Item getProvider(@RequestParam("data") String zipCode) {
    EntityManager em = entityManagerFactory.createEntityManager();
    String q = "select * from PROVIDERS where public_listing is true and zip_code = '" + zipCode + "'";
    Query query = em.createNativeQuery(q);
