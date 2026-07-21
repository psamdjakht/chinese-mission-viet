/** Lightweight progress metadata for all 50 practical missions. */
export interface ScenarioMeta {
  nameVi: string;
  missionIds: string[];
}

export const scenarioMeta: ScenarioMeta[] = [
  { nameVi: "Quán cà phê và nhà hàng", missionIds: ["m1", "m2", "m3", "m4"] },
  { nameVi: "Taxi và di chuyển", missionIds: ["m5", "m6", "m7"] },
  { nameVi: "Hỏi đường", missionIds: ["m8", "m9", "m10"] },
  { nameVi: "Tự giới thiệu", missionIds: ["m11", "m12", "m13"] },
  { nameVi: "Kết bạn", missionIds: ["m14", "m15", "m16"] },
  { nameVi: "Giao tiếp công việc", missionIds: ["m17", "m18", "m19", "m20"] },
  { nameVi: "Mua sắm và thanh toán", missionIds: ["m21", "m22", "m23", "m24"] },
  { nameVi: "Khách sạn và lưu trú", missionIds: ["m25", "m26", "m27", "m28"] },
  { nameVi: "Sân bay và tàu cao tốc", missionIds: ["m29", "m30", "m31", "m32"] },
  { nameVi: "Khám bệnh và mua thuốc", missionIds: ["m33", "m34", "m35", "m36"] },
  { nameVi: "Điện thoại và Internet", missionIds: ["m37", "m38", "m39"] },
  { nameVi: "Sinh hoạt hằng ngày và nhà ở", missionIds: ["m40", "m41", "m42"] },
  { nameVi: "Hẹn gặp và ứng xử xã hội", missionIds: ["m43", "m44", "m45"] },
  { nameVi: "Giao tiếp công việc thực tế", missionIds: ["m46", "m47", "m48"] },
  { nameVi: "An toàn và tìm trợ giúp", missionIds: ["m49", "m50"] },
];
