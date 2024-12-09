package Irumping.IrumOrder.Service;

import Irumping.IrumOrder.Dto.LoginDto;
import Irumping.IrumOrder.Entity.UserEntity;
import Irumping.IrumOrder.Repository.MockLoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final MockLoginRepository repository;

    public void signUp(UserEntity user) {
        // valid 판단
        repository.save(user.getId(), user.getPassword(), user.getEmail(), user.getName());
    }

    public boolean login(LoginDto loginDto) {
        // valid 판단
        String dbPassword = repository.Password(loginDto.getId());
        if (dbPassword.equals(loginDto.getPassword())) {
            // 로그인 성공
            return true;
        } else {
            // 로그인 실패
            return false;
        }
    }
}
