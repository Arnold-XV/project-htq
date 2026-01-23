"use client";

import React, { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function doLogin(payload: any) {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data?.error || "Login failed");
        setLoading(false);
        return null;
      }
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setMsg("Network error");
      return null;
    }
  }

  async function handleTestLogin(e: React.FormEvent) {
    e.preventDefault();
    const data = await doLogin({ testOnly: true });
    if (data?.anonUserId) {
      // set a non-HttpOnly cookie for testing fetch/submit calls
      document.cookie = `anonUserId=${data.anonUserId}; path=/;`;
      localStorage.setItem("anonUserId", data.anonUserId);
      setMsg(`Test login created: ${data.anonUserId}`);
    }
  }

  async function handleRealLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setMsg("Email and password required");
      return;
    }
    const data = await doLogin({ email, password });
    if (data?.user?.id) {
      // store a simple cookie for testing. Real session cookie may be HttpOnly if server sets it.
      document.cookie = `userId=${data.user.id}; path=/;`;
      localStorage.setItem("user", JSON.stringify(data.user));
      setMsg(`Logged in as ${data.user.email}`);
    }
  }

  return (
    <main style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Dummy Login (test only)</h1>

      <form onSubmit={handleRealLogin} style={{ maxWidth: 420 }}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </label>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button
            type="submit"
            disabled={loading}
            style={{ padding: "8px 12px" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={handleTestLogin}
            disabled={loading}
            style={{ padding: "8px 12px" }}
          >
            {loading ? "Please wait..." : "Create Test (anon)"}
          </button>

          <button
            type="button"
            onClick={() => {
              document.cookie = "anonUserId=; path=/; max-age=0";
              document.cookie = "userId=; path=/; max-age=0";
              localStorage.removeItem("anonUserId");
              localStorage.removeItem("user");
              setMsg("Cleared test auth cookies");
            }}
            style={{ padding: "8px 12px" }}
          >
            Clear
          </button>
        </div>
      </form>

      {msg && (
        <p
          style={{
            marginTop: 16,
            background: "#f3f3f3",
            padding: 8,
            borderRadius: 6,
          }}
        >
          {msg}
        </p>
      )}

      <p style={{ marginTop: 16, color: "#666" }}>
        Use Create Test (anon) to get an anonUserId cookie for calling the quiz
        submit API, or use real credentials.
      </p>
    </main>
  );
}
