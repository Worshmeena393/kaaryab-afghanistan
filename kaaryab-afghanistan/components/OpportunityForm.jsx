"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "@/lib/i18n";

const categories = [
  "Job",
  "Internship",
  "Scholarship",
  "Online course",
  "Remote work",
  "Volunteer work",
  "Advanced Training",
  "Professional Development",
];
const types = ["Remote", "On-site", "Hybrid"];

const getCategoryKey = (category) => {
  switch (category) {
    case "Job":
      return "opportunities.job";
    case "Internship":
      return "opportunities.internship";
    case "Scholarship":
      return "opportunities.scholarship";
    case "Online course":
      return "filters.onlineCourse";
    case "Remote work":
      return "opportunities.remoteWork";
    case "Volunteer work":
      return "opportunities.volunteerWork";
    case "Advanced Training":
      return "opportunities.advancedTraining";
    case "Professional Development":
      return "opportunities.professionalDevelopment";
    default:
      return "opportunities.all";
  }
};

const getTypeKey = (type) => {
  switch (type) {
    case "Remote":
      return "opportunities.remote";
    case "On-site":
      return "opportunities.onSite";
    case "Hybrid":
      return "opportunities.hybrid";
    default:
      return "opportunities.all";
  }
};

const formatDateForInput = (dateStr) => {
  let date;
  if (!dateStr) {
    date = new Date();
    date.setDate(date.getDate() + 30);
  } else {
    date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      date = new Date();
      date.setDate(date.getDate() + 30);
    }
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const todayStr = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const buildSchema = (t) => z.object({
  title: z.string().min(3, { message: t("form.errTitleMin") || "Title must be at least 3 characters long." }).trim(),
  organization: z.string().min(2, { message: t("form.errOrgMin") || "Organization must be at least 2 characters long." }).trim(),
  category: z.enum(categories, { required_error: t("form.errCategoryReq") || "Please select a category." }),
  location: z.string().min(2, { message: t("form.errLocationMin") || "Location must be at least 2 characters long." }).trim(),
  type: z.enum(types, { required_error: t("form.errTypeReq") || "Please select a work type." }),
  deadline: z.string().min(1, { message: t("form.errDeadlineReq") || "Please set a deadline." })
    .refine((val) => !isNaN(new Date(val).getTime()), t("form.errDeadlineInvalid") || "Please enter a valid date."),
  description: z.string().min(10, { message: t("form.errDescMin") || "Description must be at least 10 characters long." }).trim(),
  requirements: z.string().min(1, { message: t("form.errReqMin") || "Please add at least one requirement." }).trim(),
  applyLink: z.string().min(4, { message: t("form.errLinkMin") || "Please enter a valid link." }).trim()
    .refine((val) => {
      try {
        let url = val.trim();
        if (!url.startsWith('http://') && !url.startsWith('https://')) url = `https://${url}`;
        new URL(url);
        return true;
      } catch {
        return false;
      }
    }, { message: t("detail.invalidLink") || "Please enter a valid URL." }),
  tags: z.string().optional(),
});

export default function OpportunityForm({ initialData = {}, onSubmit }) {
  const { t } = useTranslation();

  const schema = buildSchema(t);

  const defaultValues = {
    title: initialData.title || "",
    organization: initialData.organization || "",
    category: initialData.category || "Job",
    location: initialData.location || "",
    type: initialData.type || "Remote",
    deadline: formatDateForInput(initialData.deadline),
    description: initialData.description || "",
    requirements: initialData.requirements?.join?.(", ") ?? "",
    applyLink: initialData.applyLink || "",
    tags: initialData.tags?.join?.(", ") ?? "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onTouched",
  });

  const submit = (values) => {
    onSubmit({
      ...values,
      requirements: values.requirements
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
      tags: values.tags
        ? values.tags.split(",").map((v) => v.trim()).filter(Boolean)
        : [],
    });
  };

  const inputCls = (err) =>
    `w-full rounded-xl border bg-white dark:bg-slate-800 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[44px] ${
      err ? "border-red-400 focus:ring-red-500/40 focus:border-red-500" : "border-slate-300 dark:border-slate-700"
    }`;

  const errorCls = "mt-1 sm:mt-1.5 text-[11px] sm:text-xs font-medium text-red-600 dark:text-red-400";

  return (
    <form
      noValidate
      onSubmit={handleSubmit(submit)}
      className="space-y-5 sm:space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-lg"
    >
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
            {t("form.titleLabel")} <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title")}
            placeholder={t("form.titlePlaceholder")}
            className={inputCls(errors.title)}
          />
          {errors.title && <p className={errorCls}>{errors.title.message}</p>}
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
            {t("form.organizationLabel")} <span className="text-red-500">*</span>
          </label>
          <input
            {...register("organization")}
            placeholder={t("form.organizationPlaceholder")}
            className={inputCls(errors.organization)}
          />
          {errors.organization && <p className={errorCls}>{errors.organization.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
            {t("form.categoryLabel")} <span className="text-red-500">*</span>
          </label>
          <select {...register("category")} className={inputCls(errors.category)}>
            {categories.map((value) => (
              <option key={value} value={value}>{t(getCategoryKey(value))}</option>
            ))}
          </select>
          {errors.category && <p className={errorCls}>{errors.category.message}</p>}
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
            {t("form.typeLabel")} <span className="text-red-500">*</span>
          </label>
          <select {...register("type")} className={inputCls(errors.type)}>
            {types.map((value) => (
              <option key={value} value={value}>{t(getTypeKey(value))}</option>
            ))}
          </select>
          {errors.type && <p className={errorCls}>{errors.type.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
            {t("form.locationLabel")} <span className="text-red-500">*</span>
          </label>
          <input
            {...register("location")}
            placeholder={t("form.locationPlaceholder")}
            className={inputCls(errors.location)}
          />
          {errors.location && <p className={errorCls}>{errors.location.message}</p>}
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
            {t("form.deadlineLabel")} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              {...register("deadline")}
              type="date"
              min={todayStr()}
              className={`appearance-none pl-3 sm:pl-4 pr-10 sm:pr-12 ${inputCls(errors.deadline)}`}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 text-slate-500 dark:text-slate-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 sm:h-5 sm:w-5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
          </div>
          {errors.deadline && <p className={errorCls}>{errors.deadline.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
          {t("form.descriptionLabel")} <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("description")}
          placeholder={t("form.descriptionPlaceholder")}
          className={`min-h-[120px] sm:min-h-[140px] rounded-2xl ${inputCls(errors.description)}`}
        />
        {errors.description && <p className={errorCls}>{errors.description.message}</p>}
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <label className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
          {t("form.applyLinkLabel")} <span className="text-red-500">*</span>
        </label>
        <input
          {...register("applyLink")}
          type="text"
          placeholder={t("form.applyLinkPlaceholder")}
          className={inputCls(errors.applyLink)}
        />
        {errors.applyLink && <p className={errorCls}>{errors.applyLink.message}</p>}
      </div>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
            {t("form.requirementsLabel")} <span className="text-red-500">*</span>
          </label>
          <input
            {...register("requirements")}
            placeholder={t("form.requirementsPlaceholder")}
            className={inputCls(errors.requirements)}
          />
          {errors.requirements && <p className={errorCls}>{errors.requirements.message}</p>}
          <p className="mt-1 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">{t("form.commaSeparated")}</p>
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">{t("form.tagsLabel")}</label>
          <input
            {...register("tags")}
            placeholder={t("form.tagsPlaceholder")}
            className={inputCls(errors.tags)}
          />
          {errors.tags && <p className={errorCls}>{errors.tags.message}</p>}
          <p className="mt-1 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">{t("form.commaSeparated")}</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white font-bold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed min-h-[48px]"
      >
        {isSubmitting ? `${t("form.saveOpportunity")}…` : t("form.saveOpportunity")}
      </button>
    </form>
  );
}
