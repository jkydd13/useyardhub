import {
  getSupabaseAdminClient,
  requireAuthenticatedUser,
} from "../../../lib/supabaseServer";
import { getCommerceEnvironment } from "../../../lib/stripeServer";
import {
  getHubPassBusinessFirstMonthFreeEligibility,
} from "../../../lib/hubpassBusinessFreeMonthServer";

function sendJson(res, statusCode, body) {
  res.status(statusCode).json(body);
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  try {
    const user = await requireAuthenticatedUser(req);
    const admin = getSupabaseAdminClient();
    const environment = getCommerceEnvironment();

    const eligibility = await getHubPassBusinessFirstMonthFreeEligibility({
      admin,
      ownerUserId: user.id,
      environment,
    });

    return sendJson(res, 200, eligibility);
  } catch (error) {
    const statusCode = Number(error?.statusCode) || 500;

    console.error("YardHub HubPass Business checkout preview error", {
      message: error?.message,
    });

    return sendJson(res, statusCode, {
      error:
        statusCode === 401
          ? error.message
          : "YardHub could not check first-month-free eligibility.",
    });
  }
}
