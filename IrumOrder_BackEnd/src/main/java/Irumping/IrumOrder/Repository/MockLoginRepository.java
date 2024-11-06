package Irumping.IrumOrder.Repository;

import Irumping.IrumOrder.Entity.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class MockLoginRepository implements UserRepository {

    private Map<String, UserEntity> mockDB = new HashMap<>();

    @Override
    public void save(String id, String password, String email) {
        mockDB.put(id, new UserEntity(id, password, email));
    }

    @Override
    public String getPassword(String id) {
        if (!mockDB.containsKey(id)) {
            return null;
        }
        return mockDB.get(id).getPassword();
    }


}
