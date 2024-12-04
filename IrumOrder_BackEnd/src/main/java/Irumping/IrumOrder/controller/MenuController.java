package Irumping.IrumOrder.controller;

import Irumping.IrumOrder.entity.MenuEntity;
import Irumping.IrumOrder.service.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/menu")
public class MenuController {

    private final MenuService menuService;

    @Operation(
            summary = "메뉴 생성",
            description = "새로운 메뉴를 생성합니다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "메뉴 추가 완료"),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.")
            }
    )
    @PostMapping("/createMenu")
    public ResponseEntity<String> createMenu(
            @Parameter(description = "생성할 메뉴의 정보", required = true)
            @RequestBody MenuRequest menuRequest) {
        menuService.createMenu(menuRequest);
        return ResponseEntity.ok("메뉴 추가 완료");
    }

    @Operation(summary = "메뉴 삭제", description = "메뉴 ID로 메뉴를 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "메뉴 삭제 완료"),
            @ApiResponse(responseCode = "404", description = "메뉴를 찾을 수 없음")
    })
    @DeleteMapping("/deleteMenu")
    public ResponseEntity<String> deleteMenu(@Parameter(name = "menuId", description = "삭제할 메뉴의 ID", required = true) @RequestParam Long menuId) {
        menuService.deleteMenu(menuId);
        return ResponseEntity.ok("메뉴 삭제 완료");
    }


    @Operation(
            summary = "메뉴 조회",
            description = "메뉴 ID로 메뉴를 조회합니다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "메뉴 조회 완료"),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청입니다.")
            }
    )
    @GetMapping("/getMenu")
    public ResponseEntity<List<MenuEntity>> getMenu(
            @Parameter(name = "categoryId", description = "조회할 메뉴의 ID", example = "1")
            @RequestParam Long categoryId) {
        List<MenuEntity> menus = (List<MenuEntity>) menuService.findMenuByCategory(categoryId);
        return ResponseEntity.ok(menus);
    }


}
