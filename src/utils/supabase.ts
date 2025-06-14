
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wljbomhwuegmqujnkmvf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsamJvbWh3dWVnbXF1am5rbXZmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTUzNDk2MSwiZXhwIjoyMDY1MTEwOTYxfQ.O8KE09ywl-trpZRGRRjPMrH_iSscF6yurO2jShLRv7w";


export const supabase = createClient(supabaseUrl, supabaseKey);