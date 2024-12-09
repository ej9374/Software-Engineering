package Irumping.IrumOrder.Entity;

import lombok.Getter;

@Getter
public class UserEntity {

    // 대리 키(surrogate key) 사용 고려 해볼 것
    // https://quiet-jun.tistory.com/45
    private String id;
    private String password;
    private String email;
    private String name;

    public UserEntity(String id, String password, String email, String name) {
        this.id = id;
        this.password = password;
        this.email = email;
        this.name = name;
    }
}
