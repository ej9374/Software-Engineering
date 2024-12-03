package Irumping.IrumOrder.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

@Repository
public class JpaMenuDetailRepository {

    @PersistenceContext
    private final EntityManager em;

    public JpaMenuDetailRepository(EntityManager em) {
        this.em = em;
    }

    public String findMenuDetailNameById(Integer menuDetailId) {
        String jpql = "SELECT md.name FROM MenuDetailEntity md WHERE md.menuDetailId = :menuDetailId";
        return em.createQuery(jpql, String.class)
                .setParameter("menuDetailId", menuDetailId)
                .getSingleResult();
    }
}