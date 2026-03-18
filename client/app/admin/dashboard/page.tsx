"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { adminRequest, uploadFiles } from "@/lib/api";
import Modal from "@/components/ui/modal";
import { Toast } from "@/components/ui/toast";
import { PublishSuccessModal } from "@/components/ui/publish-success-modal";
import { Plus, Filter, Eye, Edit2, Trash2 } from "lucide-react";

function parseList(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function safeParseContent(value: string) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [designs, setDesigns] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [pricing, setPricing] = useState<any[]>([]);
  const [content, setContent] = useState<any[]>([]);

  const [toast, setToast] = useState<{open: boolean; message: string; type: "success" | "error"}>({
    open: false,
    message: "",
    type: "success",
  });

  const [deleteTarget, setDeleteTarget] = useState<
    | { type: "design" | "blog" | "pricing"; id: string; label: string }
    | null
  >(null);

  const activeSection = searchParams.get("section") || "home";

  function showToast(message: string, type: "success" | "error" = "success") {
    setToast({ open: true, message, type });
    window.setTimeout(() => setToast((prev) => ({ ...prev, open: false })), 3000);
  }

  const designSectionCategoryMap: Record<string, string[]> = {
    "figma-kits": ["Figma", "UI Kits"],
    posters: ["Poster", "Posters"],
    banners: ["Banner", "Banners"],
    templates: [
      "Template",
      "Templates",
      "Presentation",
      "Presentations",
      "Social Media",
    ],
  };

  const currentDesignCategories = designSectionCategoryMap[activeSection] ?? [];

  const [designForm, setDesignForm] = useState<any>({
    title: "",
    slug: "",
    price: "",
    category: currentDesignCategories[0] || "",
    image: "",
    images: [] as string[],
    description: "",
    features: "",
    visible: true,
    allowReviews: true,
  });
  const [designEditingId, setDesignEditingId] = useState<string | null>(null);
  const [designErrors, setDesignErrors] = useState<Record<string, string>>({});
  const [designFilter, setDesignFilter] = useState<"all" | "published" | "draft">("all");
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [publishedDesignSlug, setPublishedDesignSlug] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const filteredDesigns = useMemo(() => {
    const byCategory = !currentDesignCategories.length
      ? designs
      : designs.filter((item) =>
          currentDesignCategories.some((cat) => (item.categories || []).includes(cat))
        );

    if (designFilter === "published") {
      return byCategory.filter((item) => item.visible !== false);
    }

    if (designFilter === "draft") {
      return byCategory.filter((item) => item.visible === false);
    }

    return byCategory;
  }, [designs, currentDesignCategories, designFilter]);

  const [blogForm, setBlogForm] = useState<any>({
    title: "",
    slug: "",
    summary: "",
    image: "",
    date: "",
    content: "[]",
  });
  const [blogEditingId, setBlogEditingId] = useState<string | null>(null);
  const [blogErrors, setBlogErrors] = useState<Record<string, string>>({});

  const [pricingForm, setPricingForm] = useState<any>({
    name: "",
    price: "",
    description: "",
    features: "",
    highlight: false,
  });
  const [pricingEditingId, setPricingEditingId] = useState<string | null>(null);
  const [pricingErrors, setPricingErrors] = useState<Record<string, string>>({});

  const [contentForm, setContentForm] = useState<any>({
    key: activeSection === "about" ? "about" : activeSection === "support" ? "support" : "",
    title: "",
    body: "",
  });
  const [contentErrors, setContentErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = localStorage.getItem("admin_token");
    if (!stored) {
      router.push("/admin/login");
      return;
    }
    setToken(stored);
  }, [router]);

  useEffect(() => {
    if (activeSection === "about" || activeSection === "support") {
      setContentForm({
        key: activeSection,
        title: "",
        body: "",
      });
    }
  }, [activeSection]);

  useEffect(() => {
    if (!token) return;
    const loadData = async () => {
      try {
        const designsData = await adminRequest<any[]>("/api/designs", token);
        setDesigns(designsData);
        const blogsData = await adminRequest<any[]>("/api/blogs", token);
        setBlogs(blogsData);
        const pricingData = await adminRequest<any[]>("/api/pricing", token);
        setPricing(pricingData);
        const contentData = await adminRequest<any[]>("/api/content", token);
        setContent(contentData);
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };
    loadData();
  }, [token]);

  const sectionClass = useMemo(
    () =>
      "rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]",
    []
  );

  async function handleDesignSubmit() {
    if (!token) return;

    const errors: Record<string, string> = {};
    if (!designForm.title.trim()) errors.title = "Title is required.";
    if (!designForm.slug.trim()) errors.slug = "Slug is required.";
    if (!designForm.price.trim()) errors.price = "Price is required.";
    if (!designForm.image.trim() && designForm.images.length === 0) errors.image = "At least one image is required.";
    if (!designForm.description.trim()) errors.description = "Description is required.";
    if (!designForm.features.trim()) errors.features = "Features are required.";

    if (Object.keys(errors).length) {
      setDesignErrors(errors);
      return;
    }

    setDesignErrors({});

    const payload = {
      ...designForm,
      features: parseList(designForm.features),
      categories: designForm.category
        ? [designForm.category]
        : currentDesignCategories,
    };

    if (designEditingId) {
      await adminRequest(`/api/designs/${designEditingId}`, token, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      showToast("Design updated", "success");
    } else {
      await adminRequest(`/api/designs`, token, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      showToast("Design published", "success");
    }

    const publishedSlug = designForm.slug;

    setDesignEditingId(null);
    setDesignForm({
      title: "",
      slug: "",
      price: "",
      category: currentDesignCategories[0] || "",
      image: "",
      images: [],
      description: "",
      features: "",
      visible: true,
      allowReviews: true,
    });

    const data = await adminRequest<any[]>("/api/designs", token);
    setDesigns(data);

    if (!designEditingId) {
      setPublishedDesignSlug(publishedSlug);
      setPublishModalOpen(true);
      setCreateModalOpen(false);
    }
  }

  async function handleImageFilesChange(files: FileList | null) {
    if (!files || files.length === 0) return;
    try {
      const fileArray = Array.from(files);
      const { urls } = await uploadFiles(fileArray as File[]);
      setDesignForm((prev: any) => ({
        ...prev,
        images: [...(prev.images || []), ...urls],
        image: prev.image || urls[0],
      }));
    } catch {
      // ignore upload failures for now
    }
  }

  async function handleBlogSubmit() {
    if (!token) return;

    const errors: Record<string, string> = {};
    if (!blogForm.title.trim()) errors.title = "Title is required.";
    if (!blogForm.slug.trim()) errors.slug = "Slug is required.";
    if (!blogForm.date.trim()) errors.date = "Date is required.";
    if (!blogForm.summary.trim()) errors.summary = "Summary is required.";
    if (!blogForm.image.trim()) errors.image = "Image URL is required.";
    if (!blogForm.content.trim() || safeParseContent(blogForm.content).length === 0)
      errors.content = "Content is required.";

    if (Object.keys(errors).length) {
      setBlogErrors(errors);
      return;
    }

    setBlogErrors({});

    const payload = {
      ...blogForm,
      content: safeParseContent(blogForm.content),
    };
    if (blogEditingId) {
      await adminRequest(`/api/blogs/${blogEditingId}`, token, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      await adminRequest(`/api/blogs`, token, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }
    setBlogEditingId(null);
    setBlogForm({
      title: "",
      slug: "",
      summary: "",
      image: "",
      date: "",
      content: "[]",
    });
    const data = await adminRequest<any[]>("/api/blogs", token);
    setBlogs(data);
    showToast("Insight saved", "success");
  }

  async function handlePricingSubmit() {
    if (!token) return;

    const errors: Record<string, string> = {};
    if (!pricingForm.name.trim()) errors.name = "Name is required.";
    if (!pricingForm.price.trim()) errors.price = "Price is required.";
    if (!pricingForm.description.trim()) errors.description = "Description is required.";
    if (!pricingForm.features.trim()) errors.features = "Features are required.";

    if (Object.keys(errors).length) {
      setPricingErrors(errors);
      return;
    }

    setPricingErrors({});

    const payload = {
      ...pricingForm,
      features: parseList(pricingForm.features),
    };
    if (pricingEditingId) {
      await adminRequest(`/api/pricing/${pricingEditingId}`, token, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      await adminRequest(`/api/pricing`, token, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }
    setPricingEditingId(null);
    setPricingForm({ name: "", price: "", description: "", features: "", highlight: false });
    const data = await adminRequest<any[]>("/api/pricing", token);
    setPricing(data);
    showToast("Plan saved", "success");
  }

  async function handleContentSubmit() {
    if (!token) return;

    const errors: Record<string, string> = {};
    if (!contentForm.key.trim()) errors.key = "Key is required.";
    if (!contentForm.title.trim()) errors.title = "Title is required.";
    if (!contentForm.body.trim()) errors.body = "Body is required.";

    if (Object.keys(errors).length) {
      setContentErrors(errors);
      return;
    }

    setContentErrors({});

    const payload = {
      key: contentForm.key,
      title: contentForm.title,
      body: parseList(contentForm.body),
    };
    await adminRequest(`/api/content/${contentForm.key}`, token, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    setContentForm({ key: "", title: "", body: "" });
    const data = await adminRequest<any[]>("/api/content", token);
    setContent(data);
    showToast("Content saved", "success");
  }

  async function handleConfirmedDelete() {
    if (!token || !deleteTarget) return;

    const { type, id, label } = deleteTarget;
    const endpoint = type === "design" ? "/api/designs" : type === "blog" ? "/api/blogs" : "/api/pricing";

    try {
      await adminRequest(`${endpoint}/${id}`, token, { method: "DELETE" });

      if (type === "design") {
        const data = await adminRequest<any[]>("/api/designs", token);
        setDesigns(data);
      } else if (type === "blog") {
        const data = await adminRequest<any[]>("/api/blogs", token);
        setBlogs(data);
      } else if (type === "pricing") {
        const data = await adminRequest<any[]>("/api/pricing", token);
        setPricing(data);
      }

      showToast(`${label} deleted`, "success");
    } catch (error) {
      showToast("Delete failed", "error");
    }

    setDeleteTarget(null);
  }

  return (
    <main className="min-h-screen bg-white">
      <section className={`relative w-full overflow-hidden bg-white px-6 ${activeSection === "home" ? "py-12" : "pt-6 pb-12"}`}>
        <div className="pointer-events-none absolute -top-24 right-12 h-72 w-72 rounded-full bg-primary/15 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-8 h-64 w-64 rounded-full bg-accent2/20 blur-[140px]" />
        <div className="mx-auto w-full max-w-none">
          {activeSection === "home" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-3"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                Admin Dashboard
              </p>
              <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                Manage QuickDzyn Content
              </h1>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Review performance and update your design marketplace assets.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                    Export CSV
                  </button>
                  <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90">
                    View Live Store
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "home" && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Designs", value: designs.length },
                { label: "Insights", value: blogs.length },
                { label: "Plans", value: pricing.length },
                { label: "Content Blocks", value: content.length },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_15px_30px_rgba(15,23,42,0.08)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          )}

          <div className={activeSection === "home" ? "mt-10 space-y-8" : "space-y-8"}>
              <section style={{ display: activeSection === "home" ? "block" : "none" }} className={sectionClass}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-[28px] font-bold tracking-tight text-slate-900">Manage Content</h2>
                    <p className="mt-1 text-[15px] font-medium text-slate-500">
                      Review and update your digital publications
                    </p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Overview</h3>
                <p className="text-sm text-slate-600 mt-1">Welcome to the admin dashboard. Use the sidebar to manage different sections of your site.</p>
              </section>
              <section
                style={{
                  display:
                    activeSection === "figma-kits" ||
                    activeSection === "posters" ||
                    activeSection === "banners" ||
                    activeSection === "templates"
                      ? "block"
                      : "none",
                }}
                className=""
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h2 className="text-[28px] font-bold tracking-tight text-slate-900">Manage Designs</h2>
                      <p className="mt-1 text-[15px] font-medium text-slate-500">
                        Add and manage design assets across the store
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setCreateModalOpen(true);
                        setDesignEditingId(null);
                        setDesignForm({
                          title: "",
                          slug: "",
                          price: "",
                          category: currentDesignCategories[0] || "",
                          image: "",
                          images: [],
                          description: "",
                          features: "",
                          visible: true,
                          allowReviews: true,
                        });
                      }}
                      className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm hover:bg-primary/90 transition"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create Design</span>
                    </button>
                  </div>




                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-2">
                        {[
                          { label: "All Items", value: "all" },
                          { label: "Published", value: "published" },
                          { label: "Drafts", value: "draft" },
                          { label: "Archived", value: "archived" },
                        ].map((tab) => (
                          <button
                            key={tab.value}
                            type="button"
                            onClick={() => setDesignFilter(tab.value as any)}
                            className={`rounded-full px-5 py-2 text-[14px] font-semibold transition ${
                              designFilter === tab.value
                                ? "bg-primary text-white shadow-sm"
                                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[14px] font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
                      >
                        <Filter className="h-4 w-4 text-slate-500" />
                        <span>Filter</span>
                      </button>
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filteredDesigns.map((item) => {
                        const status = item.visible === false ? "Draft" : "Published";
                        const isDraft = status === "Draft";

                        return (
                          <div
                            key={item._id}
                            className="group flex flex-col overflow-hidden rounded-[24px] bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)]"
                          >
                            <div className="relative h-[200px] w-full bg-slate-50 p-2">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="h-full w-full object-cover rounded-[18px]"
                                />
                              ) : null}
                              
                              <div
                                className={`absolute left-5 top-5 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm ${
                                  isDraft ? "bg-[#F59E0B]" : "bg-[#10B981]"
                                }`}
                              >
                                {status}
                              </div>
                            </div>

                            <div className="flex flex-1 flex-col p-6">
                              <h3 className="text-[17px] font-bold leading-snug text-slate-900">
                                {item.title}
                              </h3>
                              <p className="mt-2 text-[14px] leading-relaxed text-slate-500 line-clamp-2">
                                {item.description || "No description provided."}
                              </p>

                              <div className="mt-auto pt-6 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-400">
                                  <Eye className="h-4 w-4" />
                                  <span className="text-[13px] font-semibold text-slate-500">
                                    {item.views >= 1000 ? (item.views / 1000).toFixed(1) + "k" : item.views ?? "0"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      setCreateModalOpen(true);
                                      setDesignEditingId(item._id);
                                      setDesignForm({
                                        title: item.title,
                                        slug: item.slug,
                                        price: item.price,
                                        category: item.categories?.[0] || "",
                                        image: item.image,
                                        images: item.images || (item.image ? [item.image] : []),
                                        description: item.description,
                                        features: (item.features || []).join("\n"),
                                        visible: item.visible ?? true,
                                        allowReviews: item.allowReviews ?? true,
                                      });
                                    }}
                                    className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 border border-transparent hover:border-slate-200"
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      setDeleteTarget({ type: "design", id: item._id, label: item.title })
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-slate-50 text-slate-500 transition hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                </div>
              </section>

              <section style={{ display: activeSection === "insights" ? "block" : "none" }} className={sectionClass}>
                    <h2 className="text-xl font-semibold text-slate-900">Insights</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <input
                          placeholder="Title"
                          value={blogForm.title}
                          onChange={(event) => {
                            setBlogForm({ ...blogForm, title: event.target.value });
                            setBlogErrors((prev) => ({ ...prev, title: "" }));
                          }}
                          className={`rounded-2xl border px-4 py-2 text-sm bg-white outline-none transition ${
                            blogErrors.title ? "border-red-300" : "border-slate-200"
                          }`}
                        />
                        {blogErrors.title ? (
                          <p className="text-xs text-red-500">{blogErrors.title}</p>
                        ) : null}
                      </div>
                      <div className="space-y-1">
                        <input
                          placeholder="Slug"
                          value={blogForm.slug}
                          onChange={(event) => {
                            setBlogForm({ ...blogForm, slug: event.target.value });
                            setBlogErrors((prev) => ({ ...prev, slug: "" }));
                          }}
                          className={`rounded-2xl border px-4 py-2 text-sm bg-white outline-none transition ${
                            blogErrors.slug ? "border-red-300" : "border-slate-200"
                          }`}
                        />
                        {blogErrors.slug ? (
                          <p className="text-xs text-red-500">{blogErrors.slug}</p>
                        ) : null}
                      </div>
                      <div className="space-y-1">
                        <input
                          placeholder="Date"
                          value={blogForm.date}
                          onChange={(event) => {
                            setBlogForm({ ...blogForm, date: event.target.value });
                            setBlogErrors((prev) => ({ ...prev, date: "" }));
                          }}
                          className={`rounded-2xl border px-4 py-2 text-sm bg-white outline-none transition ${
                            blogErrors.date ? "border-red-300" : "border-slate-200"
                          }`}
                        />
                        {blogErrors.date ? (
                          <p className="text-xs text-red-500">{blogErrors.date}</p>
                        ) : null}
                      </div>
                      <div className="space-y-1">
                        <input
                          placeholder="Image URL"
                          value={blogForm.image}
                          onChange={(event) => {
                            setBlogForm({ ...blogForm, image: event.target.value });
                            setBlogErrors((prev) => ({ ...prev, image: "" }));
                          }}
                          className={`rounded-2xl border px-4 py-2 text-sm bg-white outline-none transition ${
                            blogErrors.image ? "border-red-300" : "border-slate-200"
                          }`}
                        />
                        {blogErrors.image ? (
                          <p className="text-xs text-red-500">{blogErrors.image}</p>
                        ) : null}
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <textarea
                          placeholder="Summary"
                          value={blogForm.summary}
                          onChange={(event) => {
                            setBlogForm({ ...blogForm, summary: event.target.value });
                            setBlogErrors((prev) => ({ ...prev, summary: "" }));
                          }}
                          className={`rounded-2xl border px-4 py-2 text-sm bg-white outline-none transition ${
                            blogErrors.summary ? "border-red-300" : "border-slate-200"
                          }`}
                        />
                        {blogErrors.summary ? (
                          <p className="text-xs text-red-500">{blogErrors.summary}</p>
                        ) : null}
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <textarea
                          placeholder="Content JSON (array of blocks)"
                          value={blogForm.content}
                          onChange={(event) => {
                            setBlogForm({ ...blogForm, content: event.target.value });
                            setBlogErrors((prev) => ({ ...prev, content: "" }));
                          }}
                          className={`rounded-2xl border px-4 py-2 text-sm bg-white outline-none transition ${
                            blogErrors.content ? "border-red-300" : "border-slate-200"
                          }`}
                          rows={6}
                        />
                        {blogErrors.content ? (
                          <p className="text-xs text-red-500">{blogErrors.content}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        onClick={handleBlogSubmit}
                        className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                      >
                        {blogEditingId ? "Update Blog" : "Create Blog"}
                      </button>
                      {blogEditingId ? (
                        <button
                          onClick={() => {
                            setBlogEditingId(null);
                            setBlogForm({
                              title: "",
                              slug: "",
                              summary: "",
                              image: "",
                              date: "",
                              content: "[]",
                            });
                          }}
                          className="rounded-full border border-slate-200 px-4 py-2 text-sm"
                        >
                          Cancel
                        </button>
                      ) : null}
                    </div>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      {blogs.map((item) => (
                        <div
                          key={item._id}
                          className="group flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-lg"
                        >
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                            <p className="text-xs text-slate-500">{item.slug}</p>
                            {item.date ? (
                              <p className="mt-1 text-xs text-slate-500">{item.date}</p>
                            ) : null}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => {
                                setBlogEditingId(item._id);
                                setBlogForm({
                                  title: item.title,
                                  slug: item.slug,
                                  summary: item.summary,
                                  image: item.image,
                                  date: item.date,
                                  content: JSON.stringify(item.content || [], null, 2),
                                });
                              }}
                              className="rounded-full border border-slate-200 px-3 py-1 text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                setDeleteTarget({ type: "blog", id: item._id, label: item.title })
                              }
                              className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

              <section style={{ display: activeSection === "pricing" ? "block" : "none" }} className={sectionClass}>
                <h2 className="text-xl font-semibold text-slate-900">Pricing</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <input
                      placeholder="Plan Name"
                      value={pricingForm.name}
                      onChange={(event) => {
                        setPricingForm({ ...pricingForm, name: event.target.value });
                        setPricingErrors((prev) => ({ ...prev, name: "" }));
                      }}
                      className={`rounded-2xl border px-4 py-2 text-sm bg-white outline-none transition ${
                        pricingErrors.name ? "border-red-300" : "border-slate-200"
                      }`}
                    />
                    {pricingErrors.name ? (
                      <p className="text-xs text-red-500">{pricingErrors.name}</p>
                    ) : null}
                  </div>
                  <div className="space-y-1">
                    <input
                      placeholder="Price"
                      value={pricingForm.price}
                      onChange={(event) => {
                        setPricingForm({ ...pricingForm, price: event.target.value });
                        setPricingErrors((prev) => ({ ...prev, price: "" }));
                      }}
                      className={`rounded-2xl border px-4 py-2 text-sm bg-white outline-none transition ${
                        pricingErrors.price ? "border-red-300" : "border-slate-200"
                      }`}
                    />
                    {pricingErrors.price ? (
                      <p className="text-xs text-red-500">{pricingErrors.price}</p>
                    ) : null}
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <textarea
                      placeholder="Description"
                      value={pricingForm.description}
                      onChange={(event) => {
                        setPricingForm({ ...pricingForm, description: event.target.value });
                        setPricingErrors((prev) => ({ ...prev, description: "" }));
                      }}
                      className={`rounded-2xl border px-4 py-2 text-sm bg-white outline-none transition ${
                        pricingErrors.description ? "border-red-300" : "border-slate-200"
                      }`}
                    />
                    {pricingErrors.description ? (
                      <p className="text-xs text-red-500">{pricingErrors.description}</p>
                    ) : null}
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <textarea
                      placeholder="Features (one per line)"
                      value={pricingForm.features}
                      onChange={(event) => {
                        setPricingForm({ ...pricingForm, features: event.target.value });
                        setPricingErrors((prev) => ({ ...prev, features: "" }));
                      }}
                      className={`rounded-2xl border px-4 py-2 text-sm bg-white outline-none transition ${
                        pricingErrors.features ? "border-red-300" : "border-slate-200"
                      }`}
                    />
                    {pricingErrors.features ? (
                      <p className="text-xs text-red-500">{pricingErrors.features}</p>
                    ) : null}
                  </div>
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={pricingForm.highlight}
                      onChange={(event) => setPricingForm({ ...pricingForm, highlight: event.target.checked })}
                    />
                    Highlight plan
                  </label>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={handlePricingSubmit}
                    className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                  >
                    {pricingEditingId ? "Update Plan" : "Create Plan"}
                  </button>
                  {pricingEditingId ? (
                    <button
                      onClick={() => {
                        setPricingEditingId(null);
                        setPricingForm({ name: "", price: "", description: "", features: "", highlight: false });
                      }}
                      className="rounded-full border border-slate-200 px-4 py-2 text-sm"
                    >
                      Cancel
                    </button>
                  ) : null}
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {pricing.map((item) => (
                    <div
                      key={item._id}
                      className="group flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-lg"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.price}</p>
                        {item.description ? (
                          <p className="mt-1 text-xs text-slate-500">{item.description}</p>
                        ) : null}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            setPricingEditingId(item._id);
                            setPricingForm({
                              name: item.name,
                              price: item.price,
                              description: item.description,
                              features: (item.features || []).join("\n"),
                              highlight: !!item.highlight,
                            });
                          }}
                          className="rounded-full border border-slate-200 px-3 py-1 text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            setDeleteTarget({ type: "pricing", id: item._id, label: item.name })
                          }
                          className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section style={{ display: (activeSection === "about" || activeSection === "support") ? "block" : "none" }} className={sectionClass}>
                <h2 className="text-xl font-semibold text-slate-900">Site Content - {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
                <div className="mt-4 grid gap-4">
                  <div className="space-y-1">
                    <input
                      placeholder="Key (about, terms, privacy)"
                      value={contentForm.key}
                      onChange={(event) => {
                        setContentForm({ ...contentForm, key: event.target.value });
                        setContentErrors((prev) => ({ ...prev, key: "" }));
                      }}
                      className={`rounded-2xl border px-4 py-2 text-sm bg-white outline-none transition ${
                        contentErrors.key ? "border-red-300" : "border-slate-200"
                      }`}
                    />
                    {contentErrors.key ? (
                      <p className="text-xs text-red-500">{contentErrors.key}</p>
                    ) : null}
                  </div>
                  <div className="space-y-1">
                    <input
                      placeholder="Title"
                      value={contentForm.title}
                      onChange={(event) => {
                        setContentForm({ ...contentForm, title: event.target.value });
                        setContentErrors((prev) => ({ ...prev, title: "" }));
                      }}
                      className={`rounded-2xl border px-4 py-2 text-sm bg-white outline-none transition ${
                        contentErrors.title ? "border-red-300" : "border-slate-200"
                      }`}
                    />
                    {contentErrors.title ? (
                      <p className="text-xs text-red-500">{contentErrors.title}</p>
                    ) : null}
                  </div>
                  <div className="space-y-1">
                    <textarea
                      placeholder="Body (one paragraph per line)"
                      value={contentForm.body}
                      onChange={(event) => {
                        setContentForm({ ...contentForm, body: event.target.value });
                        setContentErrors((prev) => ({ ...prev, body: "" }));
                      }}
                      className={`rounded-2xl border px-4 py-2 text-sm bg-white outline-none transition ${
                        contentErrors.body ? "border-red-300" : "border-slate-200"
                      }`}
                      rows={6}
                    />
                    {contentErrors.body ? (
                      <p className="text-xs text-red-500">{contentErrors.body}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={handleContentSubmit}
                    className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                  >
                    Save Content
                  </button>
                </div>
                <div className="mt-6 space-y-3">
                  {content.map((item) => (
                    <div
                      key={item._id}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                    >
                      <p className="text-sm font-semibold text-slate-900">{item.key}</p>
                      <p className="text-xs text-slate-500">{item.title}</p>
                    </div>
                  ))}
                </div>
              </section>
          </div>
        </div>
      </section>

      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />

      <PublishSuccessModal
        open={publishModalOpen}
        storeHref={publishedDesignSlug ? `/designs/${encodeURIComponent(publishedDesignSlug)}` : "/"}
        onClose={() => {
          setPublishModalOpen(false);
          setPublishedDesignSlug(null);
        }}
      />

      <Modal
        open={!!deleteTarget}
        title="Confirm delete"
        message={`Are you sure you want to delete "${deleteTarget?.label}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmedDelete}
      />
      {/* Design Create / Edit Modal Popup */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => {
              setCreateModalOpen(false);
              setDesignEditingId(null);
              setDesignErrors({});
            }}
          />
          <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-8 py-5 rounded-t-[28px]">
              <div>
                <h3 className="text-[20px] font-bold text-slate-900">
                  {designEditingId ? "Edit Design" : "Add New Design"}
                </h3>
                <p className="text-[13px] text-slate-500 mt-0.5">
                  Fill in the details to list a new design asset on the platform.
                </p>
              </div>
              <button
                onClick={() => {
                  setCreateModalOpen(false);
                  setDesignEditingId(null);
                  setDesignErrors({});
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
              >
                ×
              </button>
            </div>

            <div className="p-8">
              <div className="grid gap-6 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-7">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600">
                      Design Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="e.g. Minimalist UI Kit"
                      value={designForm.title}
                      onChange={(event) => {
                        setDesignForm({ ...designForm, title: event.target.value });
                        setDesignErrors((prev) => ({ ...prev, title: "" }));
                      }}
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-white outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/10 ${
                        designErrors.title ? "border-red-300" : "border-slate-200"
                      }`}
                    />
                    {designErrors.title && <p className="text-xs text-red-500">{designErrors.title}</p>}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">
                        URL Slug <span className="text-red-500">*</span>
                      </label>
                      <input
                        placeholder="minimalist-ui"
                        value={designForm.slug}
                        onChange={(event) => {
                          setDesignForm({ ...designForm, slug: event.target.value });
                          setDesignErrors((prev) => ({ ...prev, slug: "" }));
                        }}
                        className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-white outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/10 ${
                          designErrors.slug ? "border-red-300" : "border-slate-200"
                        }`}
                      />
                      {designErrors.slug && <p className="text-xs text-red-500">{designErrors.slug}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">
                        Price (USD) <span className="text-red-500">*</span>
                      </label>
                      <input
                        placeholder="$ 49.00"
                        value={designForm.price}
                        onChange={(event) => {
                          setDesignForm({ ...designForm, price: event.target.value });
                          setDesignErrors((prev) => ({ ...prev, price: "" }));
                        }}
                        className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-white outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/10 ${
                          designErrors.price ? "border-red-300" : "border-slate-200"
                        }`}
                      />
                      {designErrors.price && <p className="text-xs text-red-500">{designErrors.price}</p>}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600">Category</label>
                    <select
                      value={designForm.category}
                      onChange={(event) =>
                        setDesignForm((prev: any) => ({ ...prev, category: event.target.value }))
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm bg-white outline-none transition focus:border-primary/60"
                    >
                      <option value="">Select category</option>
                      {Array.from(new Set(currentDesignCategories)).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      placeholder="Describe the key features, components, and compatibility of this design..."
                      value={designForm.description}
                      onChange={(event) => {
                        setDesignForm({ ...designForm, description: event.target.value });
                        setDesignErrors((prev) => ({ ...prev, description: "" }));
                      }}
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-white outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/10 ${
                        designErrors.description ? "border-red-300" : "border-slate-200"
                      }`}
                      rows={3}
                    />
                    {designErrors.description && <p className="text-xs text-red-500">{designErrors.description}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600">
                      Features (one per line) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      placeholder={"E.g. 50+ components\nResponsive layout\nFigma + Sketch files"}
                      value={designForm.features}
                      onChange={(event) => {
                        setDesignForm({ ...designForm, features: event.target.value });
                        setDesignErrors((prev) => ({ ...prev, features: "" }));
                      }}
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-white outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/10 ${
                        designErrors.features ? "border-red-300" : "border-slate-200"
                      }`}
                      rows={3}
                    />
                    {designErrors.features && <p className="text-xs text-red-500">{designErrors.features}</p>}
                  </div>
                </div>

                <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 lg:col-span-5">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Preview Images</p>
                    <p className="text-xs text-slate-500 mt-1">Upload up to 5 images (PNG, JPG, GIF).</p>
                  </div>

                  <label
                    htmlFor="design-images-modal"
                    className={`flex min-h-[120px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed ${
                      designErrors.image ? "border-red-300" : "border-slate-200"
                    } bg-white p-4 text-center transition hover:border-primary/40`}
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="text-2xl">📷</span>
                      <span className="text-sm font-semibold text-slate-700">Click to upload</span>
                      <span className="text-xs text-slate-400">SVG, PNG, JPG or GIF</span>
                    </div>
                    <input
                      id="design-images-modal"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(event) => handleImageFilesChange(event.target.files)}
                      className="hidden"
                    />
                  </label>
                  {designErrors.image && <p className="text-xs text-red-500">{designErrors.image}</p>}

                  {designForm.images?.length ? (
                    <div className="grid grid-cols-3 gap-2">
                      {designForm.images.map((url: string) => (
                        <div key={url} className="relative overflow-hidden rounded-xl border border-slate-200 bg-white">
                          <img src={url} alt="upload" className="h-16 w-full object-cover" />
                          <button
                            type="button"
                            onClick={() =>
                              setDesignForm((prev: any) => ({
                                ...prev,
                                images: prev.images.filter((img: string) => img !== url),
                                image: prev.image === url ? prev.images.filter((img: string) => img !== url)[0] : prev.image,
                              }))
                            }
                            className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow text-xs text-slate-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Visible on store</p>
                        <p className="text-xs text-slate-500">Show on marketplace</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={designForm.visible}
                          onChange={(e) => setDesignForm((prev: any) => ({ ...prev, visible: e.target.checked }))}
                        />
                        <div className="peer h-5 w-10 rounded-full bg-slate-300 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-4" />
                      </label>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Allow reviews</p>
                        <p className="text-xs text-slate-500">Let buyers leave ratings</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={designForm.allowReviews}
                          onChange={(e) => setDesignForm((prev: any) => ({ ...prev, allowReviews: e.target.checked }))}
                        />
                        <div className="peer h-5 w-10 rounded-full bg-slate-300 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-4" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3 justify-end">
                <button
                  onClick={() => { setCreateModalOpen(false); setDesignEditingId(null); setDesignErrors({}); }}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                {!designEditingId && (
                  <button
                    onClick={() => showToast("Draft saved", "success")}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Save Draft
                  </button>
                )}
                <button
                  onClick={handleDesignSubmit}
                  className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition"
                >
                  {designEditingId ? "Update Design" : "Publish Design"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
