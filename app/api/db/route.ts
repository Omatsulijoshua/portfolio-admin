import { NextResponse } from "next/server";
import { dbService } from "@/lib/dbService";

export async function POST(request: Request) {
  try {
    const { action, payload } = await request.json();
    
    // Check if user is logged in for protected/write admin operations
    const isProtectedAction = [
      "addCategory",
      "updateCategory",
      "deleteCategory",
      "addProject",
      "updateProject",
      "deleteProject",
      "getMessages",
      "deleteMessage",
      "getPageViewStats"
    ].includes(action);

    if (isProtectedAction) {
      const cookieHeader = request.headers.get("cookie") || "";
      const hasSession = cookieHeader.includes("joshua_studio_admin_session=authenticated");
      if (!hasSession) {
        return NextResponse.json({ error: "Unauthorized access. Invalid session." }, { status: 401 });
      }
    }

    let result;
    switch (action) {
      case "getCategories":
        result = await dbService.getCategories();
        break;
      case "addCategory":
        result = await dbService.addCategory(payload.category);
        break;
      case "updateCategory":
        result = await dbService.updateCategory(payload.id, payload.updates);
        break;
      case "deleteCategory":
        result = await dbService.deleteCategory(payload.id);
        break;
      case "getProjects":
        result = await dbService.getProjects();
        break;
      case "getProjectBySlug":
        result = await dbService.getProjectBySlug(payload.slug);
        break;
      case "addProject":
        result = await dbService.addProject(payload.project);
        break;
      case "updateProject":
        result = await dbService.updateProject(payload.id, payload.updates);
        break;
      case "deleteProject":
        result = await dbService.deleteProject(payload.id);
        break;
      case "saveMessage":
        result = await dbService.saveMessage(payload.name, payload.email, payload.message);
        break;
      case "getMessages":
        result = await dbService.getMessages();
        break;
      case "deleteMessage":
        result = await dbService.deleteMessage(payload.id);
        break;
      case "trackPageView":
        result = await dbService.trackPageView(payload.pagePath, payload.ip, payload.userAgent);
        break;
      case "getPageViewStats":
        result = await dbService.getPageViewStats();
        break;
      default:
        return NextResponse.json({ error: "Invalid action request" }, { status: 400 });
    }
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("API DB Router error:", error);
    return NextResponse.json({ error: error.message || "Internal database proxy error" }, { status: 500 });
  }
}
