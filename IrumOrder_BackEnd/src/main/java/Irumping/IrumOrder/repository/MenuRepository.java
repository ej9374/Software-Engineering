package Irumping.IrumOrder.repository;

import Irumping.IrumOrder.entity.MenuEntity;

import java.util.List;
import java.util.Optional;

public interface MenuRepository {

    MenuEntity findMenuById(Long menuId);

    // 이름으로 메뉴 검색
    Optional<MenuEntity> findByName(String name);

    // 카테고리에 따라 검색
    List<MenuEntity> findByCategory(Long categoryId);

    public void saveMenu(MenuEntity menu);

    public void deleteMenu(Long menuId);

}