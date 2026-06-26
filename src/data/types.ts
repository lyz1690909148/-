// 标准数据类型定义
export type Category =
  | "material"
  | "mechanical"
  | "environment"
  | "electronic"
  | "construction"
  | "chemical";

export type StandardStatus = "active" | "recommended" | "pending" | "withdrawn";

export type Issuer =
  | "GB" // 中国国家标准
  | "ISO" // 国际标准化组织
  | "ASTM" // 美国材料试验协会
  | "IEC" // 国际电工委员会
  | "JIS" // 日本工业标准
  | "DIN" // 德国标准
  | "BS" // 英国标准
  | "EN" // 欧洲标准
  | "NF" // 法国标准
  | "GJB"; // 中国国家军用标准

export interface StandardRevision {
  code: string;
  date: string;
  note: string;
}

export interface Standard {
  id: string;
  code: string;
  titleZh: string;
  titleEn: string;
  category: Category;
  status: StandardStatus;
  publishDate: string; // ISO YYYY-MM-DD
  effectiveDate: string;
  issuer: Issuer;
  issuerName: string; // 主管部门/组织全称
  scope: string; // 适用范围
  testConditions: string[]; // 主要试验条件
  principle: string; // 试验原理/方法概要
  apparatus: string[]; // 主要仪器设备
  keywords: string[];
  references: string[]; // 引用其他标准编号
  referencedBy: string[]; // 被引用
  revisions: StandardRevision[];
  supersedes?: string; // 替代旧版编号
}

export const CATEGORY_LABELS: Record<Category, { zh: string; en: string }> = {
  material: { zh: "材料", en: "Materials" },
  mechanical: { zh: "机械", en: "Mechanical" },
  environment: { zh: "环境与可靠性", en: "Environment & Reliability" },
  electronic: { zh: "电子电气", en: "Electronics & Electrical" },
  construction: { zh: "建筑工程", en: "Construction" },
  chemical: { zh: "化工", en: "Chemical" },
};

export const STATUS_LABELS: Record<StandardStatus, { zh: string; color: string }> = {
  active: { zh: "现行", color: "pill-active" },
  recommended: { zh: "推荐", color: "pill-recommended" },
  pending: { zh: "即将实施", color: "pill-pending" },
  withdrawn: { zh: "已废止", color: "pill-withdrawn" },
};

export const ISSUER_LABELS: Record<Issuer, string> = {
  GB: "国家标准化管理委员会",
  ISO: "国际标准化组织",
  ASTM: "美国材料与试验协会",
  IEC: "国际电工委员会",
  JIS: "日本工业标准调查会",
  DIN: "德国标准化学会",
  BS: "英国标准学会",
  EN: "欧洲标准化委员会",
  NF: "法国标准化协会",
  GJB: "中央军委装备发展部",
};
