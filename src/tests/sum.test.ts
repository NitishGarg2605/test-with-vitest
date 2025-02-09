import {app} from "../index";
import {test,describe,expect,vi} from "vitest";
import request from "supertest";
import {prismaclient} from "../__mocks__/db";



vi.mock("../db");
describe("checking the post sum point",()=>{
    test("should return 3 if input is 1 and 2",async ()=>{
        prismaclient.request.create.mockResolvedValue({
            id:1,
            answer:3,
            type:"sum",
            a:1,
            b:2

        })
        vi.spyOn(prismaclient.request,"create")
        const res=await request(app).post("/sum").send({
            a:1,
            b:2
         })
         expect(prismaclient.request.create).toHaveBeenCalledWith({
             data:{
                 a:1,
                 b:2,
                 type:"sum",
                 answer:3,
             }
         })
        expect(res.status).toBe(200);
        expect(res.body.sum).toBe(3);
    })
    test("should return 400 if input is greater than 100000",async ()=>{
        const res=await request(app).post("/sum").send({
            a:100001,
            b:2
         })
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Numbers should be less than or equal to 100000");
    });
})

describe("checking the post multiply point",()=>{
    test("should return 2 if input is 1 and 2",async ()=>{
        const res=await request(app).post("/multiply").send({
            a:1,
            b:2
         })
        expect(res.status).toBe(200);
        expect(res.body.product).toBe(2);
    })
})