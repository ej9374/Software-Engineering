package Irumping.IrumOrder.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * 클래스 설명: RoutineController 테스트 클래스
 *
 * 작성자: 양나슬
 * 마지막 수정일: 2024-12-02
 */

@SpringBootTest
@AutoConfigureMockMvc
class RoutineControllerTest {
    @Autowired
    private MockMvc mockMvc;

    //루틴 생성 성공 테스트
    @Test
    void testCreateRoutineSuccess() throws Exception {
        // Test for T09-1: Routine creation
        String routineJson = """
        {
            "userId": 1,
            "menuId": 1,
            "menuDetailId" : 1,
            "routineDay": "Mon",
            "routineTime": "10:00:00",
            "isActivated": true
        }
        """;

        mockMvc.perform(post("/api/users/1/routines/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(routineJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.routineDay").value("Mon"))
                .andExpect(jsonPath("$.routineTime").value("10:00:00"));
    }

    //루틴 생성 실패 테스트 - missing fields
    @Test
    void testCreateRoutineMissingFields() throws Exception {
        // Test for T09-2: Routine creation with missing required fields
        String routineJson = """
        {
            "userId": 1,
            "menuId": 2
        }
        """;

        mockMvc.perform(post("/api/users/1/routines/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(routineJson))
                .andExpect(status().isBadRequest());
    }

    //루틴 업데이트 성공 테스트
    @Test
    void testUpdateRoutineSuccess() throws Exception {
        // Test for T09-3: Update routine
        String updatedRoutineJson = """
        {
            "userId": 1,
            "menuId": 2,
            "routineDay": "Fri",
            "routineTime": "10:00:00",
            "isActivated": true
        }
        """;

        mockMvc.perform(put("/api/users/1/routines/22")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedRoutineJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.routineDay").value("Fri"));
    }

    //루틴 삭제 성공 테스트
    @Test
    void testDeleteRoutineSuccess() throws Exception {
        // Test for T09-4: Delete routine
        mockMvc.perform(delete("/api/users/1/routines/22"))
                .andExpect(status().isNoContent());
    }

//    //DB 연결 실패 테스트
//    //DB 연결 해제 후 테스트 필요
//    @Test
//    void testDbConnectionFailure() throws Exception {
//        // Test for T09-6: Handle DB failure scenario
//        mockMvc.perform(get("/api/users/12345/routines"))
//                .andExpect(status().isInternalServerError())
//                .andExpect(content().string("DB connect fail"));
//    }
}